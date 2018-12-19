//import 'whatwg-fetch'  // for pouchdb7 https://www.npmjs.com/package/whatwg-fetch  please npm install whatwg-fetch --save
//import PouchDB from 'pouchdb'

// if (!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && !(navigator.userAgent.toLowerCase().indexOf('safari') > -1 && navigator.userAgent.toLowerCase().indexOf('chrome') == -1) ) {
if (true) {
	L.TileLayer.addInitHook(function() {
		if (!this.options.useCache) {
			this._db = null;
			this._canvas = null;
			return;
		}

		var MAX_DOC_COUNT = 10 * 1000;  // 70;  //1屏大约需要25个瓦片
		var _this = this;
		var resetDB = function() {
			_this._db && _this._db.destroy().then(function() {
				_this._db = new PouchDB('offline-tiles');
				_this._db && _this._db.compact().then(function (info) {
					// compaction complete
					//console.log(info);
				}).catch(function (err) {
					// handle errors
					console.error(err);
				});
			}).catch(function (err) {
				// error occurred
				console.error(err);
			});
		};

		this._db = new PouchDB('offline-tiles', {auto_compaction: true});
		this._db && this._db.info().then(function (info) {
			console.log(info);
			if (info && info.hasOwnProperty('doc_count')) {
				if (info.doc_count > MAX_DOC_COUNT) {
					console.log('Reset db.');
					resetDB();
				}
			}
		}).catch(function (error) {
			console.error(error);
		});
		this._canvas = document.createElement('canvas');

		if (!(this._canvas.getContext && this._canvas.getContext('2d'))) {
			// HTML5 canvas is needed to pack the tiles as base64 data. If
			//   the browser doesn't support canvas, the code will forcefully
			//   skip caching the tiles.
			this._canvas = null;
		}
	});

// 馃崅namespace TileLayer
// 馃崅section PouchDB tile caching options
// 馃崅option useCache: Boolean = false
// Whether to use a PouchDB cache on this tile layer, or not
	L.TileLayer.prototype.options.useCache = false;

// 馃崅option saveToCache: Boolean = true
// When caching is enabled, whether to save new tiles to the cache or not
	L.TileLayer.prototype.options.saveToCache = true;

// 馃崅option useOnlyCache: Boolean = false
// When caching is enabled, whether to request new tiles from the network or not
	L.TileLayer.prototype.options.useOnlyCache = false;

// 馃崅option useCache: String = 'image/png'
// The image format to be used when saving the tile images in the cache
	L.TileLayer.prototype.options.cacheFormat = 'image/png';

// 馃崅option cacheMaxAge: Number = 24*3600*1000
// Maximum age of the cache, in milliseconds
	L.TileLayer.prototype.options.cacheMaxAge = 7 * 24 * 3600 * 1000; // 缓存1周 //10 * 1000; //

	L.TileLayer.include({
		// Overwrites L.TileLayer.prototype.createTile
		createTile: function(coords, done) {
			var tile = document.createElement('img');

			tile.onerror = L.bind(this._tileOnError, this, done, tile);

			if (this.options.crossOrigin) {
				tile.crossOrigin = '';
			}

			// Alt tag is *set to empty string to keep screen readers from reading URL and for compliance reasons
			// http://www.w3.org/TR/WCAG20-TECHS/H67

			tile.alt = '';

			var tileUrl = this.getTileUrl(coords);

			if (this._db && this.options.useCache && this._canvas) {
				this._db.get(tileUrl, { revs_info: true }, this._onCacheLookup(tile, tileUrl, done));
			} else {
				// Fall back to standard behaviour
				tile.onload = L.bind(this._tileOnLoad, this, done, tile);
			}
			tile.src = ''; // for safari
			tile.src = tileUrl;
			return tile;
		},

		// Returns a callback (closure over tile/key/originalSrc) to be run when the DB
		//   backend is finished with a fetch operation.
		_onCacheLookup: function(tile, tileUrl, done) {
			return function(err, data) {
				if (err) {
					// console.error(err);
					if (err.reason === 'QuotaExceededError') {
						this._db && this._db.destroy();
						this._db = null;
					}
				}
				if (data) {
					if (Date.now() > data.timestamp + this.options.cacheMaxAge && !this.options.useOnlyCache) {
						// Tile is too old, try to refresh it
						// console.log('Tile is too old: ', tileUrl);
						if (this.options.saveToCache) {
							// https://pouchdb.com/guides/conflicts.html
							// tile.onload = L.bind(this._saveTile, this, tile, tileUrl, data._revs_info[0].rev, done);
							// console.log('data >>> ' + data);
							// console.log('data._rev >>> ' + data._rev);
							//console.log(data._rev);
							tile.onload = L.bind(this._saveTile, this, tile, tileUrl, data._rev, done);
							this.fire('tilecachemiss', {
								tile: tile,
								url: tileUrl
							});
						}
						tile.crossOrigin = 'Anonymous';
						tile.src = ''; // for safari
						tile.src = tileUrl;
						tile.onerror = function(ev) {
							// If the tile is too old but couldn't be fetched from the network,
							//   serve the one still in cache.
							this.src = data.dataUrl;
							this.fire('tilecachehit', {
								tile: tile,
								url: tileUrl
							});
						};
					} else {
						// Serve tile from cached data
						// console.log('Tile is cached: ', tileUrl);
						tile.onload = L.bind(this._tileOnLoad, this, done, tile);
						tile.src = ''; // for safari
						tile.src = data.dataUrl; // data.dataUrl is already a base64-encoded PNG image.
						//console.log('--------------------');
						//console.log(data.dataUrl.length);
						//if (data.dataUrl.length < 8000) {
						//	console.log(data.dataUrl);
						//}
						//console.log(data.dataUrl.indexOf('base64'));
						this.fire('tilecachehit', {
							tile: tile,
							url: tileUrl
						});
					}
				} else {
					this.fire('tilecachemiss', {
						tile: tile,
						url: tileUrl
					});
					if (this.options.useOnlyCache) {
						// Offline, not cached
						// console.log('Tile not in cache', tileUrl);
						tile.onload = L.Util.falseFn;
						tile.src = L.Util.emptyImageUrl;
					} else {
						 //Online, not cached, request the tile normally
						 //console.log('Requesting tile normally', tileUrl);
						if (this.options.saveToCache) {
							tile.onload = L.bind(this._saveTile, this, tile, tileUrl, null, done);
						} else {
							tile.onload = L.bind(this._tileOnLoad, this, done, tile);
						}
						tile.crossOrigin = 'Anonymous';
					    tile.src = '';  // very important for safari!
						tile.src = tileUrl;
					}
				}
			}.bind(this);
		},

		// Returns an event handler (closure over DB key), which runs
		//   when the tile (which is an <img>) is ready.
		// The handler will delete the document from pouchDB if an existing revision is passed.
		//   This will keep just the latest valid copy of the image in the cache.
		_saveTile: function(tile, tileUrl, existingRevision, done) {
			console.log('save tile...');
			//this._canvas = document.createElement('canvas');
			if (this._canvas === null) return;
			this._canvas.width = tile.naturalWidth || tile.width;
			this._canvas.height = tile.naturalHeight || tile.height;

			var dataUrl;
			try {
				var context = this._canvas.getContext('2d');
				context.drawImage(tile, 0, 0);
				dataUrl = this._canvas.toDataURL(this.options.cacheFormat);
			} catch (err) {
				this.fire('tilecacheerror', { tile: tile, error: err });
				//this._canvas = null;
				dataUrl = null;
				tile = null;
				if (done) {
					return done();
				}
				return;
			} finally {
				//this._canvas = null;
			}
			if (!dataUrl || dataUrl.length < 1000 || dataUrl.indexOf(';base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=') > -1) {  // must not save error data!
				this.fire('tilecacheerror2', { tile: tile, error: err });
				console.log('dataUrl error!');
				dataUrl = null;
				tile = null;
				if (done) {
					return done();
				}
				return;
			}
			var doc = { dataUrl: dataUrl, timestamp: Date.now() };
			// console.log('existingRevision >>> ' + existingRevision);
			// if (existingRevision) {
			//   this._db && this._db.remove(tileUrl, existingRevision);
			// }
			// //FIXME: There is a deprecation warning about parameters in the
			// db.put(doc, id, rev) has been deprecated and will be removed in a future release, please use db.put({_id: id, _rev: rev}) instead
			// this._db.put() call.
			// this._db.put(doc, tileUrl, doc.timestamp);
			// the fix
			doc['_id'] = tileUrl;
			// doc['_rev'] = doc.timestamp;
			// this._db.put(doc); // https://pouchdb.com/guides/conflicts.html
			var _this = this;

			var doPut = function(doc) {
				_this._db && _this._db
						.put(doc)
						.then(function() {
							// success
						})
						.catch(function(err) {
							if (err.name === 'conflict') {
								// conflict!
								console.log('got conflict on put.');
								// console.log(err);
							} else {
								// some other error
								console.error(err);
								if (err.reason === 'QuotaExceededError') {
									// console.log(_this._db);
									_this._db && _this._db.destroy();
									_this._db = null;
								}
								//   _this._db.compact();
								//   PouchDB.destroy('offline-tiles').then(function() {
								//     this._db = new PouchDB('offline-tiles');
								//   });
							}
						})
						.finally(function () {
                            // 使用完后清空该对象，释放内存；
							setTimeout(function(){
								console.log('free dataurl.')
								dataUrl = null;
								tile = null;
						    },10);
						});
			}
			var rmAndPut = function(doc, rev) {
				_this._db && _this._db.remove(doc._id, rev).then(function() {
					doPut(doc);
				});
			}
			if (existingRevision) {
				console.log('remove expired doc and put...');
				rmAndPut(doc, existingRevision);
			} else {
				this._db && this._db.get(doc._id, function(err, d) {
					if (err) {
						if (err.status === 404) {
							console.log('404 and put...');
							doPut(doc);
						} else {
							console.log(err);
						}
					} else {
						if (d) {
							console.log('remove old doc and put...');
							rmAndPut(doc, d._rev);
						} else {
							console.log('got empty doc and put...');
							doPut(doc);
						}
					}
				});
			}

			if (done) {
				done();
			}
		},

		// 馃崅section PouchDB tile caching options
		// 馃崅method seed(bbox: LatLngBounds, minZoom: Number, maxZoom: Number): this
		// Starts seeding the cache given a bounding box and the minimum/maximum zoom levels
		// Use with care! This can spawn thousands of requests and flood tileservers!
		seed: function(bbox, minZoom, maxZoom) {
			if (!this.options.useCache) return;
			if (minZoom > maxZoom) return;
			if (!this._map) return;

			var queue = [];

			for (var z = minZoom; z <= maxZoom; z++) {
				var northEastPoint = this._map.project(bbox.getNorthEast(), z);
				var southWestPoint = this._map.project(bbox.getSouthWest(), z);

				// Calculate tile indexes as per L.TileLayer._update and
				//   L.TileLayer._addTilesFromCenterOut
				var tileSize = this.getTileSize();
				var tileBounds = L.bounds(
						L.point(Math.floor(northEastPoint.x / tileSize.x), Math.floor(northEastPoint.y / tileSize.y)),
						L.point(Math.floor(southWestPoint.x / tileSize.x), Math.floor(southWestPoint.y / tileSize.y))
				);

				for (var j = tileBounds.min.y; j <= tileBounds.max.y; j++) {
					for (var i = tileBounds.min.x; i <= tileBounds.max.x; i++) {
						point = new L.Point(i, j);
						point.z = z;
						queue.push(this._getTileUrl(point));
					}
				}
			}

			var seedData = {
				bbox: bbox,
				minZoom: minZoom,
				maxZoom: maxZoom,
				queueLength: queue.length
			};
			this.fire('seedstart', seedData);
			var tile = this._createTile();
			tile._layer = this;
			this._seedOneTile(tile, queue, seedData);
			return this;
		},

		_createTile: function() {
			return document.createElement('img');
		},

		// Modified L.TileLayer.getTileUrl, this will use the zoom given by the parameter coords
		//  instead of the maps current zoomlevel.
		_getTileUrl: function(coords) {
			var zoom = coords.z;
			if (this.options.zoomReverse) {
				zoom = this.options.maxZoom - zoom;
			}
			zoom += this.options.zoomOffset;
			return L.Util.template(
					this._url,
					L.extend(
							{
								r: this.options.detectRetina && L.Browser.retina && this.options.maxZoom > 0 ? '@2x' : '',
								s: this._getSubdomain(coords),
								x: coords.x,
								y: this.options.tms ? this._globalTileRange.max.y - coords.y : coords.y,
								z: this.options.maxNativeZoom ? Math.min(zoom, this.options.maxNativeZoom) : zoom
							},
							this.options
					)
			);
		},

		// Uses a defined tile to eat through one item in the queue and
		//   asynchronously recursively call itself when the tile has
		//   finished loading.
		_seedOneTile: function(tile, remaining, seedData) {
			if (!remaining.length) {
				this.fire('seedend', seedData);
				return;
			}
			this.fire('seedprogress', {
				bbox: seedData.bbox,
				minZoom: seedData.minZoom,
				maxZoom: seedData.maxZoom,
				queueLength: seedData.queueLength,
				remainingLength: remaining.length
			});

			var url = remaining.pop();

			this._db && this._db.get(
					url,
					function (err, data) {
						if (err) {
							console.error(err);
						}
						if (!data) {
							// FIXME: Do something on tile error!!
							tile.onload = function(ev) {
								this._saveTile(tile, url, null); // (ev)
								this._seedOneTile(tile, remaining, seedData);
							}.bind(this);
							tile.src = ''; // for safari
							tile.crossOrigin = 'Anonymous';
							tile.src = url;
						} else {
							this._seedOneTile(tile, remaining, seedData);
						}
					}.bind(this)
			);
		}
	});
}


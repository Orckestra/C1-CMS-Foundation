/**
* Composite image plugin.
*/
new function () {

	tinymce.create("tinymce.plugins.CompositeImageResizePlugin", {

		/**
		* Get info
		*/
		getInfo: function () {
			return {
				longname: "Composite Image Resize Plugin",
				author: "Composite A/S",
				authorurl: "http://www.composite.net",
				infourl: null,
				version: tinymce.majorVersion + "." + tinymce.minorVersion
			};
		},

		/**
		* @param {tinymce.Editor} ed
		* @param {string} url
		*/
		init: function (ed, url) {

			var editor = ed;
			var selectedElmX, selectedElmY, selectedElm, selectedElmGhost, selectedHandle, startX, startY, startW, startH, ratio, resizeHandles, width, height;

			// Details about each resize handle how to scale etc
			resizeHandles = {
				// Name: x multiplier, y multiplier, delta size x, delta size y
				//                        n: [.5, 0, 0, -1],
				//                        e: [1, .5, 1, 0],
				//                        s: [.5, 1, 0, 1],
				//                        w: [0, .5, -1, 0],
				nw: [0, 0, -1, -1],
				ne: [1, 0, 1, -1],
				se: [1, 1, 1, 1],
				sw: [0, 1, -1, 1]
			};

			function resizeElement(e) {
				var deltaX, deltaY;

				// Calc new width/height
				deltaX = e.screenX - startX;
				deltaY = e.screenY - startY;

				// Calc new size
				width = deltaX * selectedHandle[2] + startW;
				height = deltaY * selectedHandle[3] + startH;

				// Never scale down lower than 5 pixels
				width = width < 5 ? 5 : width;
				height = height < 5 ? 5 : height;

				// Constrain proportions when modifier key is pressed or if the nw, ne, sw, se corners are moved on an image
				if (tinymce.VK.modifierPressed(e) || (selectedElm.nodeName == "IMG" && selectedHandle[2] * selectedHandle[3] !== 0)) {
					width = Math.round(height / ratio);
					height = Math.round(width * ratio);
				}

				// Update ghost size
				editor.dom.setStyles(selectedElmGhost, {
					width: width,
					height: height
				});

				// Update ghost X position if needed
				if (selectedHandle[2] < 0 && selectedElmGhost.clientWidth <= width) {
					editor.dom.setStyle(selectedElmGhost, 'left', selectedElmX + (startW - width));
				}

				// Update ghost Y position if needed
				if (selectedHandle[3] < 0 && selectedElmGhost.clientHeight <= height) {
					editor.dom.setStyle(selectedElmGhost, 'top', selectedElmY + (startH - height));
				}
			}

			function endResize() {
				function setSizeProp(name, value) {
					if (value) {
						// Resize by using style or attribute
						if (selectedElm.style[name] || !editor.schema.isValid(selectedElm.nodeName.toLowerCase(), name)) {
							editor.dom.setStyle(selectedElm, name, value);
						} else {
							editor.dom.setAttrib(selectedElm, name, value);
						}
					}
				}

				// Set width/height properties
				setSizeProp('width', width);
				setSizeProp('height', height);

				editor.dom.unbind(editor.getDoc(), 'mousemove', resizeElement);
				editor.dom.unbind(editor.getDoc(), 'mouseup', endResize);

				// Remove ghost and update resize handle positions
				editor.dom.remove(selectedElmGhost);
				showResizeRect(selectedElm);
			}

			function showResizeRect(targetElm) {
				var position, targetWidth, targetHeight;

				hideResizeRect();

				// Get position and size of target
				position = editor.dom.getPos(targetElm);
				selectedElmX = position.x;
				selectedElmY = position.y;
				targetWidth = targetElm.offsetWidth;
				targetHeight = targetElm.offsetHeight;

				// Reset width/height if user selects a new image/table
				if (selectedElm != targetElm) {
					selectedElm = targetElm;
					width = height = 0;
				}

				tinymce.each(resizeHandles, function (handle, name) {
					var handleElm;

					// Get existing or render resize handle
					handleElm = editor.dom.get('mceResizeHandle' + name);
					if (!handleElm) {
						handleElm = editor.dom.add(editor.getDoc().documentElement, 'div', {
							id: 'mceResizeHandle' + name,
							'class': 'mceResizeHandle',
							style: 'cursor:' + name + '-resize; margin:0; padding:0'
						});

						editor.dom.bind(handleElm, 'mousedown', function (e) {
							e.preventDefault();

							//endResize();

							startX = e.screenX;
							startY = e.screenY;
							startW = selectedElm.clientWidth;
							startH = selectedElm.clientHeight;
							ratio = startH / startW;
							selectedHandle = handle;

							selectedElmGhost = selectedElm.cloneNode(true);
							editor.dom.addClass(selectedElmGhost, 'mceClonedResizable');
							editor.dom.setStyles(selectedElmGhost, {
								left: selectedElmX,
								top: selectedElmY,
								margin: 0
							});

							editor.getDoc().documentElement.appendChild(selectedElmGhost);

							editor.dom.bind(editor.getDoc(), 'mousemove', resizeElement);
							editor.dom.bind(editor.getDoc(), 'mouseup', endResize);


						});
					} else {
						editor.dom.show(handleElm);
					}

					// Position element
					editor.dom.setStyles(handleElm, {
						left: (targetWidth * handle[0] + selectedElmX) - (handleElm.offsetWidth / 2),
						top: (targetHeight * handle[1] + selectedElmY) - (handleElm.offsetHeight / 2)
					});
				});
			}

			function hideResizeRect() {
				if (selectedElm) {
					selectedElm.removeAttribute('data-mce-selected');
				}

				for (var name in resizeHandles) {
					editor.dom.hide('mceResizeHandle' + name);
				}
			}

			// Add CSS for resize handles, cloned element and selected
			editor.contentStyles.push(
                        '.mceResizeHandle {' +
                                'position: absolute;' +
                                'border: 1px solid black;' +
                                'background: #FFF;' +
                                'width: 5px;' +
                                'height: 5px;' +
                                'z-index: 10000' +
                        '}' +
                        '.mceResizeHandle:hover {' +
                                'background: #000' +
                        '}' +
                        'img.mceClonedResizable, table.mceClonedResizable {' +
                                'position: absolute;' +
                                'outline: 1px dashed black;' +
                                'opacity: .5;' +
                                'z-index: 10000' +
                        '}'
                );

			function updateResizeRect() {
				var controlElm = editor.dom.getParent(editor.selection.getNode(), 'img');

				if (controlElm && VisualEditorBinding.isImageElement(controlElm)) {
					showResizeRect(controlElm);
				} else {
					hideResizeRect();
				}
			}

			// Show/hide resize rect when image is selected
			editor.onNodeChange.add(updateResizeRect);

		}

	});

	// Register plugin
	tinymce.PluginManager.add("compositeimageresize", tinymce.plugins.CompositeImageResizePlugin);


};
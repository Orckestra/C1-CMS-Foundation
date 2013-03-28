/**
* Composite table plugin.
*/
new function () {

    var each = tinymce.each, Event = tinymce.dom.Event;

	var URL_TABLE = "${tiny}/plugins/compositetable/table.aspx";
	var URL_ROW = "${tiny}/plugins/compositetable/row.aspx";
	var URL_CELL = "${tiny}/plugins/compositetable/cell.aspx";
	var URL_MERGE = "${tiny}/plugins/compositetable/merge.aspx";

	tinymce.create("tinymce.plugins.CompositeTablePlugin", {

		/**
		* @type {tinymce.Editor}
		*/
		editor: null,

		/**
		* @type {tinymce.Theme}
		*/
		theme: null,

		/**
		* Get info
		*/
		getInfo: function () {
			return {
				longname: "Composite Table Plugin",
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
		    var TABLE_INSERT_P_BEFORE = 'INSERT_P_BEFORE';
		    var TABLE_UNKNOWN = 'UNKNOWN';
		    var state = TABLE_UNKNOWN;

		    function isEnter(e) {
		        return e.keyCode === tinymce.VK.ENTER;
		    }

		    function isEnterWithoutShift(e) {
		        return isEnter(e) && !e.shiftKey;
		    }

		    function getListKeyState(e) {
		        if (isEnterWithoutShift(e) && isRequiredParagraphBefore()) {
		            return TABLE_INSERT_P_BEFORE;
		        } else {
		            return TABLE_UNKNOWN;
		        }
		    }

		    function cancelDefaultEvents(ed, e) {
		        if (state == TABLE_INSERT_P_BEFORE) {
		            Event.cancel(e);
		        }
		    }

		    function isRequiredParagraphBefore() {
		        var focusElm = ed.selection.getStart();
		        var tdElm = ed.dom.getParent(focusElm, "td,th");
		        if (tdElm && !tdElm.previousElementSibling) {
		            var trElm = ed.dom.getParent(tdElm, "tr");
		            if (trElm && !trElm.previousElementSibling) {
		                var range = ed.selection.getRng(true);
		                if (range.startOffset == 0 && range.endOffset == 0) {
		                    var tableElm = ed.dom.getParent(trElm, "table");
		                    if (tableElm && (!tableElm.previousElementSibling || tableElm.previousElementSibling.nodeName.toLowerCase() != "p")) {
		                        return true;
		                    }
		                }
		            }
		        }
		        return false;
		    }

			this.editor = ed;
			this.theme = this.editor.theme;

			/*
			* Fixes a bug in FF3.0 where the cursor gets stuck in  
			* a table when the table is the last element on page.
			*/
			ed.onNodeChange.add(function (editor, cm, n) {
				var body = editor.getBody();
				if (body.hasChildNodes()) {
					if (body.lastChild.nodeName.toLowerCase() == "table") {
						body.appendChild(body.ownerDocument.createElement("p"));
					}
				}
			});

            //Add Bogus BR to empty TDs
			ed.onBeforeSetContent.add(function (ed, o) {
				if (!Client.isExplorer)
					o.content = o.content.replace(/<td><\/td>/g, '<td><br data-mce-bogus="1"/></td>');
			});

            //Insert paragraph before table on Enter
			ed.onKeyUp.add(function (ed, e) {
			    if (state == TABLE_INSERT_P_BEFORE)
			    {
			        var focusElm = ed.selection.getStart();
			        var tableElm = ed.dom.getParent(focusElm, "table");
			        var body = ed.getBody();
			        p = body.ownerDocument.createElement("p");
			        if (!tinymce.isIE) {
			            p.innerHTML = '<br data-mce-bogus="1">';
			        }
			        tableElm.parentNode.insertBefore(p, tableElm);
			        ed.selection.setCursorLocation(p, 0);
			    }
			});

			ed.onKeyDown.add(function (_, e) { state = getListKeyState(e); });
			ed.onKeyDown.add(cancelDefaultEvents);


		},

		/**
		* @param {string} cmd
		* @param {boolean} ui
		* @param {string} value
		*/
		execCommand: function (cmd, ui, value) {

			var result = false;
			var editor = this.editor;
			var editorBinding = editor.theme.editorBinding;

			switch (cmd) {
				case "mceInsertTable":
				case "mceTableRowProps":
				case "mceTableCellProps":
				case "mceTableSplitCells":
				case "mceTableMergeCells":
				case "mceTableInsertRowBefore":
				case "mceTableInsertRowAfter":
				case "mceTableDeleteRow":
				case "mceTableInsertColBefore":
				case "mceTableInsertColAfter":
				case "mceTableDeleteCol":
				case "mceTableCutRow":
				case "mceTableCopyRow":
				case "mceTablePasteRowBefore":
				case "mceTablePasteRowAfter":
				case "mceTableDelete":

					var element = editor.selection.getNode();
					editor.execCommand("mceBeginUndoLevel");
					this._doExecCommand(element, cmd, ui, value);
					editor.execCommand("mceEndUndoLevel");
					editorBinding.checkForDirty();
					result = true;
					break;
			}

			return result;
		},

		/**
		* 
		*/
		_doExecCommand: function (element, command, user_interface, value) {

			var inst = this.editor, ed = inst, url = this.url;
			var focusElm = inst.selection.getStart();
			var trElm = inst.dom.getParent(focusElm, "tr");
			var tdElm = inst.dom.getParent(focusElm, "td,th");
			var tableElm = inst.dom.getParent(focusElm, "table");
			var doc = inst.contentWindow.document;
			var tableBorder = tableElm ? tableElm.getAttribute("border") : "";

			// Get first TD if no TD found
			if (trElm && tdElm == null)
				tdElm = trElm.cells[0];

			function inArray(ar, v) {
				for (var i = 0; i < ar.length; i++) {
					// Is array
					if (ar[i].length > 0 && inArray(ar[i], v))
						return true;

					// Found value
					if (ar[i] == v)
						return true;
				}

				return false;
			}

			function select(dx, dy) {
				var td;

				grid = getTableGrid(tableElm);
				dx = dx || 0;
				dy = dy || 0;
				dx = Math.max(cpos.cellindex + dx, 0);
				dy = Math.max(cpos.rowindex + dy, 0);

				// Recalculate grid and select
				inst.execCommand('mceRepaint');
				td = getCell(grid, dy, dx);

				if (td) {
					inst.selection.select(td.firstChild || td);
					inst.selection.collapse(1);
				}
			};

			function makeTD() {
				var newTD = doc.createElement("td");

				if (!tinymce.isIE)
					newTD.innerHTML = '<br data-mce-bogus="1"/>';
			}

			function getColRowSpan(td) {
				var colspan = inst.dom.getAttrib(td, "colspan");
				var rowspan = inst.dom.getAttrib(td, "rowspan");

				colspan = colspan == "" ? 1 : parseInt(colspan);
				rowspan = rowspan == "" ? 1 : parseInt(rowspan);

				return { colspan: colspan, rowspan: rowspan };
			}

			function getCellPos(grid, td) {
				var x, y;

				for (y = 0; y < grid.length; y++) {
					for (x = 0; x < grid[y].length; x++) {
						if (grid[y][x] == td)
							return { cellindex: x, rowindex: y };
					}
				}

				return null;
			}

			function getCell(grid, row, col) {
				if (grid[row] && grid[row][col])
					return grid[row][col];

				return null;
			}

			function getNextCell(table, cell) {
				var cells = [], x = 0, i, j, cell, nextCell;

				for (i = 0; i < table.rows.length; i++)
					for (j = 0; j < table.rows[i].cells.length; j++, x++)
						cells[x] = table.rows[i].cells[j];

				for (i = 0; i < cells.length; i++)
					if (cells[i] == cell)
						if (nextCell = cells[i + 1])
							return nextCell;
			}

			function getTableGrid(table) {
				var grid = [], rows = table.rows, x, y, td, sd, xstart, x2, y2;

				for (y = 0; y < rows.length; y++) {
					for (x = 0; x < rows[y].cells.length; x++) {
						td = rows[y].cells[x];
						sd = getColRowSpan(td);

						// All ready filled
						for (xstart = x; grid[y] && grid[y][xstart]; xstart++);

						// Fill box
						for (y2 = y; y2 < y + sd['rowspan']; y2++) {
							if (!grid[y2])
								grid[y2] = [];

							for (x2 = xstart; x2 < xstart + sd['colspan']; x2++)
								grid[y2][x2] = td;
						}
					}
				}

				return grid;
			}

			function trimRow(table, tr, td, new_tr) {
				var grid = getTableGrid(table), cpos = getCellPos(grid, td);
				var cells, lastElm;

				// Time to crop away some
				if (new_tr.cells.length != tr.childNodes.length) {
					cells = tr.childNodes;
					lastElm = null;

					for (var x = 0; td = getCell(grid, cpos.rowindex, x); x++) {
						var remove = true;
						var sd = getColRowSpan(td);

						// Remove due to rowspan
						if (inArray(cells, td)) {
							new_tr.childNodes[x]._delete = true;
						} else if ((lastElm == null || td != lastElm) && sd.colspan > 1) { // Remove due to colspan
							for (var i = x; i < x + td.colSpan; i++)
								new_tr.childNodes[i]._delete = true;
						}

						if ((lastElm == null || td != lastElm) && sd.rowspan > 1)
							td.rowSpan = sd.rowspan + 1;

						lastElm = td;
					}

					deleteMarked(tableElm);
				}
			}

			function prevElm(node, name) {
				while ((node = node.previousSibling) != null) {
					if (node.nodeName == name)
						return node;
				}

				return null;
			}

			function nextElm(node, names) {
				var namesAr = names.split(',');

				while ((node = node.nextSibling) != null) {
					for (var i = 0; i < namesAr.length; i++) {
						if (node.nodeName.toLowerCase() == namesAr[i].toLowerCase())
							return node;
					}
				}

				return null;
			}

			function deleteMarked(tbl) {
				if (tbl.rows == 0)
					return;

				var tr = tbl.rows[0];
				do {
					var next = nextElm(tr, "TR");

					// Delete row
					if (tr._delete) {
						tr.parentNode.removeChild(tr);
						continue;
					}

					// Delete cells
					var td = tr.cells[0];
					if (td.cells > 1) {
						do {
							var nexttd = nextElm(td, "TD,TH");

							if (td._delete)
								td.parentNode.removeChild(td);
						} while ((td = nexttd) != null);
					}
				} while ((tr = next) != null);
			}

			function addRows(td_elm, tr_elm, rowspan) {
				// Add rows
				td_elm.rowSpan = 1;
				var trNext = nextElm(tr_elm, "TR");
				for (var i = 1; i < rowspan && trNext; i++) {
					var newTD = doc.createElement("td");

					if (!tinymce.isIE)
						newTD.innerHTML = '<br data-mce-bogus="1"/>';

					if (tinymce.isIE)
						trNext.insertBefore(newTD, trNext.cells(td_elm.cellIndex));
					else
						trNext.insertBefore(newTD, trNext.cells[td_elm.cellIndex]);

					trNext = nextElm(trNext, "TR");
				}
			}

			function copyRow(doc, table, tr) {
				var grid = getTableGrid(table);
				var newTR = tr.cloneNode(false);
				var cpos = getCellPos(grid, tr.cells[0]);
				var lastCell = null;
				var tableBorder = inst.dom.getAttrib(table, "border");
				var tdElm = null;

				for (var x = 0; tdElm = getCell(grid, cpos.rowindex, x); x++) {
					var newTD = null;

					if (lastCell != tdElm) {
						for (var i = 0; i < tr.cells.length; i++) {
							if (tdElm == tr.cells[i]) {
								newTD = tdElm.cloneNode(true);
								break;
							}
						}
					}

					if (newTD == null) {
						newTD = doc.createElement("td");

						if (!tinymce.isIE)
							newTD.innerHTML = '<br data-mce-bogus="1"/>';
					}

					// Reset col/row span
					newTD.colSpan = 1;
					newTD.rowSpan = 1;

					newTR.appendChild(newTD);

					lastCell = tdElm;
				}

				return newTR;
			}

			// ---- Commands -----

			// Handle commands
			switch (command) {
				case "mceTableMoveToNextRow":
					var nextCell = getNextCell(tableElm, tdElm);

					if (!nextCell) {
						inst.execCommand("mceTableInsertRowAfter", tdElm);
						nextCell = getNextCell(tableElm, tdElm);
					}

					inst.selection.select(nextCell);
					inst.selection.collapse(true);

					return true;

				case "mceTableRowProps":

					if (trElm != null) {

						this.editor.theme.enableDialogMode();

						// construct dialog argument.
						var dialogArgument = {
							tinyAction: value,
							tinyWindow: window,
							tinyElement: trElm,
							tinyEngine: tinymce,
							tinyInstance: this.editor,
							tinyTheme: this.editor.theme,
							editorBinding: this.editor.theme.editorBinding
						}

						var self = this;
						var dialogHandler = {
							handleDialogResponse: function (response, result) {

								self.editor.theme.disableDialogMode();

								if (response == Dialog.RESPONSE_ACCEPT) {

									switch (result.get("action")) {
										case "row":
											self._updateTableRow(trElm, result);
											break;
										case "all":
											new List(tableElm.rows).each(function (row) {
												self._updateTableRow(row, result);
											});
											break;
										case "odd":
										case "even":
											var i = 0;
											new List(tableElm.rows).each(function (row) {
												if ((i % 2 == 0 && result.get("action") == "odd") || (i % 2 != 0 && result.get("action") == "even")) {
													self._updateTableRow(row, result);
												}
												i++;
											});
											break;
									}

									self.editor.addVisual(tableElm);
									self.editor.nodeChanged();
								}
							}
						}

						// open dialog
						Dialog.invokeModal(
							URL_ROW,
							dialogHandler,
							dialogArgument
						);

					}

					/*
					if (trElm == null)
					return true;

					if (user_interface) {
					inst.windowManager.open({
					url : url + '/row.htm',
					width : 400 + parseInt(inst.getLang('table.rowprops_delta_width', 0)),
					height : 295 + parseInt(inst.getLang('table.rowprops_delta_height', 0)),
					inline : 1
					}, {
					plugin_url : url
					});
					}
					*/

					return true;

				case "mceTableCellProps":
					if (tdElm != null) {

						this.editor.theme.enableDialogMode();

						// construct dialog argument.
						var dialogArgument = {
							tinyAction: value,
							tinyWindow: window,
							tinyElement: tdElm,
							tinyEngine: tinymce,
							tinyInstance: this.editor,
							tinyTheme: this.editor.theme,
							editorBinding: this.editor.theme.editorBinding
						}

						var self = this;
						var dialogHandler = {
							handleDialogResponse: function (response, result) {

								self.editor.theme.disableDialogMode();

								if (response == Dialog.RESPONSE_ACCEPT) {

									switch (result.get("action")) {
										case "cell":
											self._updateTableCell(tdElm, result);
											break;
										case "row":
											new List(tdElm.parentNode.cells).each(function (cell) {
												self._updateTableCell(cell, result);
											});
											break;
										case "all":
											new List(tableElm.rows).each(function (row) {
												new List(row.cells).each(function (cell) {
													self._updateTableCell(cell, result);
												});
											});
											break;
									}

									self.editor.addVisual(tableElm);
									self.editor.nodeChanged();
								}
							}
						}

						// open dialog
						Dialog.invokeModal(
							URL_CELL,
							dialogHandler,
							dialogArgument
						);
					}

					return true;

				case "mceInsertTable":

					if (user_interface) {

						this.editor.theme.enableDialogMode();

						// when updating, pinpoint the target table
						var table = null;

						if (value == "update") {
							table = tableElm;
						}

						// construct dialog argument.
						var dialogArgument = {
							tinyAction: value,
							tinyWindow: window,
							tinyElement: table,
							tinyEngine: tinymce,
							tinyInstance: this.editor,
							tinyTheme: this.editor.theme,
							editorBinding: this.editor.theme.editorBinding
						}

						// construct dialog handler.

						var self = this;
						var dialogHandler = {
							handleDialogResponse: function (response, result) {

								self.editor.theme.disableDialogMode();

								if (response == Dialog.RESPONSE_ACCEPT) {
									switch (dialogArgument.tinyAction) {
										case "insert":
											self._insertTable(result);
											break;
										case "update":
											self._updateTable(result);
											break;
									}
									//tinyMCE.triggerNodeChange ();
									self.editor.nodeChanged();
								}
							}
						}

						// open dialog
						Dialog.invokeModal(
							URL_TABLE,
							dialogHandler,
							dialogArgument
						);
					}

					return true;

					/*
					if (user_interface) {
					inst.windowManager.open({
					url : url + '/table.htm',
					width : 400 + parseInt(inst.getLang('table.table_delta_width', 0)),
					height : 320 + parseInt(inst.getLang('table.table_delta_height', 0)),
					inline : 1
					}, {
					plugin_url : url,
					action : value ? value.action : 0
					});
					}
					return true;
					*/

				case "mceTableDelete":
					var table = inst.dom.getParent(inst.selection.getNode(), "table");
					if (table) {
						table.parentNode.removeChild(table);
						inst.execCommand('mceRepaint');
					}
					return true;

				case "mceTableSplitCells":
				case "mceTableMergeCells":
				case "mceTableInsertRowBefore":
				case "mceTableInsertRowAfter":
				case "mceTableDeleteRow":
				case "mceTableInsertColBefore":
				case "mceTableInsertColAfter":
				case "mceTableDeleteCol":
				case "mceTableCutRow":
				case "mceTableCopyRow":
				case "mceTablePasteRowBefore":
				case "mceTablePasteRowAfter":
					// No table just return (invalid command)
					if (!tableElm)
						return true;

					// Table has a tbody use that reference
					// Changed logic by ApTest 2005.07.12 (www.aptest.com)
					// Now lookk at the focused element and take its parentNode.  That will be a tbody or a table.
					if (trElm && tableElm != trElm.parentNode)
						tableElm = trElm.parentNode;

					if (tableElm && trElm) {
						switch (command) {
							case "mceTableCutRow":
								if (!trElm || !tdElm)
									return true;

								inst.tableRowClipboard = copyRow(doc, tableElm, trElm);
								inst.execCommand("mceTableDeleteRow");
								break;

							case "mceTableCopyRow":
								if (!trElm || !tdElm)
									return true;

								inst.tableRowClipboard = copyRow(doc, tableElm, trElm);
								break;

							case "mceTablePasteRowBefore":
								if (!trElm || !tdElm)
									return true;

								var newTR = inst.tableRowClipboard.cloneNode(true);

								var prevTR = prevElm(trElm, "TR");
								if (prevTR != null)
									trimRow(tableElm, prevTR, prevTR.cells[0], newTR);

								trElm.parentNode.insertBefore(newTR, trElm);
								break;

							case "mceTablePasteRowAfter":
								if (!trElm || !tdElm)
									return true;

								var nextTR = nextElm(trElm, "TR");
								var newTR = inst.tableRowClipboard.cloneNode(true);

								trimRow(tableElm, trElm, tdElm, newTR);

								if (nextTR == null)
									trElm.parentNode.appendChild(newTR);
								else
									nextTR.parentNode.insertBefore(newTR, nextTR);

								break;

							case "mceTableInsertRowBefore":
								if (!trElm || !tdElm)
									return true;

								var grid = getTableGrid(tableElm);
								var cpos = getCellPos(grid, tdElm);
								var newTR = doc.createElement("tr");
								var lastTDElm = null;

								cpos.rowindex--;
								if (cpos.rowindex < 0)
									cpos.rowindex = 0;

								// Create cells
								for (var x = 0; tdElm = getCell(grid, cpos.rowindex, x); x++) {
									if (tdElm != lastTDElm) {
										var sd = getColRowSpan(tdElm);

										if (sd['rowspan'] == 1) {
											var newTD = doc.createElement("td");

											if (!tinymce.isIE)
												newTD.innerHTML = '<br data-mce-bogus="1"/>';

											newTD.colSpan = tdElm.colSpan;

											newTR.appendChild(newTD);
										} else
											tdElm.rowSpan = sd['rowspan'] + 1;

										lastTDElm = tdElm;
									}
								}

								trElm.parentNode.insertBefore(newTR, trElm);
								select(0, 1);
								break;

							case "mceTableInsertRowAfter":
								if (!trElm || !tdElm)
									return true;

								var grid = getTableGrid(tableElm);
								var cpos = getCellPos(grid, tdElm);
								var newTR = doc.createElement("tr");
								var lastTDElm = null;

								// Create cells
								for (var x = 0; tdElm = getCell(grid, cpos.rowindex, x); x++) {
									if (tdElm != lastTDElm) {
										var sd = getColRowSpan(tdElm);

										if (sd['rowspan'] == 1) {
											var newTD = doc.createElement("td");

											if (!tinymce.isIE)
												newTD.innerHTML = '<br data-mce-bogus="1"/>';

											newTD.colSpan = tdElm.colSpan;

											newTR.appendChild(newTD);
										} else
											tdElm.rowSpan = sd['rowspan'] + 1;

										lastTDElm = tdElm;
									}
								}

								if (newTR.hasChildNodes()) {
									var nextTR = nextElm(trElm, "TR");
									if (nextTR)
										nextTR.parentNode.insertBefore(newTR, nextTR);
									else
										tableElm.appendChild(newTR);
								}

								select(0, 1);
								break;

							case "mceTableDeleteRow":
								if (!trElm || !tdElm)
									return true;

								var grid = getTableGrid(tableElm);
								var cpos = getCellPos(grid, tdElm);

								// Only one row, remove whole table
								if (grid.length == 1 && tableElm.nodeName == 'TBODY') {
									inst.dom.remove(inst.dom.getParent(tableElm, "table"));
									return true;
								}

								// Move down row spanned cells
								var cells = trElm.cells;
								var nextTR = nextElm(trElm, "TR");
								for (var x = 0; x < cells.length; x++) {
									if (cells[x].rowSpan > 1) {
										var newTD = cells[x].cloneNode(true);
										var sd = getColRowSpan(cells[x]);

										newTD.rowSpan = sd.rowspan - 1;

										var nextTD = nextTR.cells[x];

										if (nextTD == null)
											nextTR.appendChild(newTD);
										else
											nextTR.insertBefore(newTD, nextTD);
									}
								}

								// Delete cells
								var lastTDElm = null;
								for (var x = 0; tdElm = getCell(grid, cpos.rowindex, x); x++) {
									if (tdElm != lastTDElm) {
										var sd = getColRowSpan(tdElm);

										if (sd.rowspan > 1) {
											tdElm.rowSpan = sd.rowspan - 1;
										} else {
											trElm = tdElm.parentNode;

											if (trElm.parentNode)
												trElm._delete = true;
										}

										lastTDElm = tdElm;
									}
								}

								deleteMarked(tableElm);

								select(0, -1);
								break;

							case "mceTableInsertColBefore":
								if (!trElm || !tdElm)
									return true;

								var grid = getTableGrid(inst.dom.getParent(tableElm, "table"));
								var cpos = getCellPos(grid, tdElm);
								var lastTDElm = null;

								for (var y = 0; tdElm = getCell(grid, y, cpos.cellindex); y++) {
									if (tdElm != lastTDElm) {
										var sd = getColRowSpan(tdElm);

										if (sd['colspan'] == 1) {
											var newTD = doc.createElement(tdElm.nodeName);

											if (!tinymce.isIE)
												newTD.innerHTML = '<br data-mce-bogus="1"/>';

											newTD.rowSpan = tdElm.rowSpan;

											tdElm.parentNode.insertBefore(newTD, tdElm);
										} else
											tdElm.colSpan++;

										lastTDElm = tdElm;
									}
								}

								select();
								break;

							case "mceTableInsertColAfter":
								if (!trElm || !tdElm)
									return true;

								var grid = getTableGrid(inst.dom.getParent(tableElm, "table"));
								var cpos = getCellPos(grid, tdElm);
								var lastTDElm = null;

								for (var y = 0; tdElm = getCell(grid, y, cpos.cellindex); y++) {
									if (tdElm != lastTDElm) {
										var sd = getColRowSpan(tdElm);

										if (sd['colspan'] == 1) {
											var newTD = doc.createElement(tdElm.nodeName);

											if (!tinymce.isIE)
												newTD.innerHTML = '<br data-mce-bogus="1"/>';

											newTD.rowSpan = tdElm.rowSpan;

											var nextTD = nextElm(tdElm, "TD,TH");
											if (nextTD == null)
												tdElm.parentNode.appendChild(newTD);
											else
												nextTD.parentNode.insertBefore(newTD, nextTD);
										} else
											tdElm.colSpan++;

										lastTDElm = tdElm;
									}
								}

								select(1);
								break;

							case "mceTableDeleteCol":
								if (!trElm || !tdElm)
									return true;

								var grid = getTableGrid(tableElm);
								var cpos = getCellPos(grid, tdElm);
								var lastTDElm = null;

								// Only one col, remove whole table
								if ((grid.length > 1 && grid[0].length <= 1) && tableElm.nodeName.toLowerCase() == 'TBODY') {
									inst.dom.remove(inst.dom.getParent(tableElm, "table"));
									return true;
								}

								// Delete cells
								for (var y = 0; tdElm = getCell(grid, y, cpos.cellindex); y++) {
									if (tdElm != lastTDElm) {
										var sd = getColRowSpan(tdElm);

										if (sd['colspan'] > 1)
											tdElm.colSpan = sd['colspan'] - 1;
										else {
											if (tdElm.parentNode)
												tdElm.parentNode.removeChild(tdElm);
										}

										lastTDElm = tdElm;
									}
								}

								select(-1);
								break;

							case "mceTableSplitCells":
								if (!trElm || !tdElm)
									return true;

								var spandata = getColRowSpan(tdElm);

								var colspan = spandata["colspan"];
								var rowspan = spandata["rowspan"];

								// Needs splitting
								if (colspan > 1 || rowspan > 1) {
									// Generate cols
									tdElm.colSpan = 1;
									for (var i = 1; i < colspan; i++) {
										var newTD = doc.createElement("td");

										if (!tinymce.isIE)
											newTD.innerHTML = '<br data-mce-bogus="1"/>';

										trElm.insertBefore(newTD, nextElm(tdElm, "TD,TH"));

										if (rowspan > 1)
											addRows(newTD, trElm, rowspan);
									}

									addRows(tdElm, trElm, rowspan);
								}

								// Apply visual aids
								tableElm = inst.dom.getParent(inst.selection.getNode(), "table");
								break;

							case "mceTableMergeCells":
								var rows = [];
								var sel = inst.selection.getSel();
								var grid = getTableGrid(tableElm);

								if (tinymce.isIE || sel.rangeCount == 1) {
									if (user_interface) {

										this.editor.theme.enableDialogMode();

										var sp = getColRowSpan(tdElm);

										var dialogArgument = {
											tinyAction: value,
											tinyWindow: window,
											tinyElement: trElm,
											tinyEngine: tinymce,
											tinyInstance: this.editor,
											tinyTheme: this.editor.theme,
											editorBinding: this.editor.theme.editorBinding
										}

										dialogArgument.numcols = sp.colspan;
										dialogArgument.numrows = sp.rowspan;

										var self = this;
										var dialogHandler = {
											handleDialogResponse: function (response, result) {

												self.editor.theme.disableDialogMode();

												if (response == Dialog.RESPONSE_ACCEPT) {
													var args = new Array();
													args["numcols"] = result.get("numcols");
													args["numrows"] = result.get("numrows");
													inst.execCommand(
													"mceTableMergeCells", false, args
												);
												}
											}
										}

										// open dialog
										Dialog.invokeModal(
										URL_MERGE,
										dialogHandler,
										dialogArgument
									);

										return true;

									} else {
										var numRows = parseInt(value['numrows']);
										var numCols = parseInt(value['numcols']);
										var cpos = getCellPos(grid, tdElm);

										if (("" + numRows) == "NaN")
											numRows = 1;

										if (("" + numCols) == "NaN")
											numCols = 1;

										// Get rows and cells
										var tRows = tableElm.rows;
										for (var y = cpos.rowindex; y < grid.length; y++) {
											var rowCells = [];

											for (var x = cpos.cellindex; x < grid[y].length; x++) {
												var td = getCell(grid, y, x);

												if (td && !inArray(rows, td) && !inArray(rowCells, td)) {
													var cp = getCellPos(grid, td);

													// Within range
													if (cp.cellindex < cpos.cellindex + numCols && cp.rowindex < cpos.rowindex + numRows)
														rowCells[rowCells.length] = td;
												}
											}

											if (rowCells.length > 0)
												rows[rows.length] = rowCells;

											var td = getCell(grid, cpos.rowindex, cpos.cellindex);
											each(ed.dom.select('br', td), function (e, i) {
												if (i > 0 && ed.dom.getAttrib('data-mce-bogus'))
													ed.dom.remove(e);
											});
										}

										//return true;
									}
								} else {
									var cells = [];
									var sel = inst.selection.getSel();
									var lastTR = null;
									var curRow = null;
									var x1 = -1, y1 = -1, x2, y2;

									// Only one cell selected, whats the point?
									if (sel.rangeCount < 2)
										return true;

									// Get all selected cells
									for (var i = 0; i < sel.rangeCount; i++) {
										var rng = sel.getRangeAt(i);
										var tdElm = rng.startContainer.childNodes[rng.startOffset];

										if (!tdElm)
											break;

										if (tdElm.nodeName == "TD" || tdElm.nodeName == "TH")
											cells[cells.length] = tdElm;
									}

									// Get rows and cells
									var tRows = tableElm.rows;
									for (var y = 0; y < tRows.length; y++) {
										var rowCells = [];

										for (var x = 0; x < tRows[y].cells.length; x++) {
											var td = tRows[y].cells[x];

											for (var i = 0; i < cells.length; i++) {
												if (td == cells[i]) {
													rowCells[rowCells.length] = td;
												}
											}
										}

										if (rowCells.length > 0)
											rows[rows.length] = rowCells;
									}

									// Find selected cells in grid and box
									var curRow = [];
									var lastTR = null;
									for (var y = 0; y < grid.length; y++) {
										for (var x = 0; x < grid[y].length; x++) {
											grid[y][x]._selected = false;

											for (var i = 0; i < cells.length; i++) {
												if (grid[y][x] == cells[i]) {
													// Get start pos
													if (x1 == -1) {
														x1 = x;
														y1 = y;
													}

													// Get end pos
													x2 = x;
													y2 = y;

													grid[y][x]._selected = true;
												}
											}
										}
									}

									// Is there gaps, if so deny
									for (var y = y1; y <= y2; y++) {
										for (var x = x1; x <= x2; x++) {
											if (!grid[y][x]._selected) {
												alert("Invalid selection for merge.");
												return true;
											}
										}
									}
								}

								// Validate selection and get total rowspan and colspan
								var rowSpan = 1, colSpan = 1;

								// Validate horizontal and get total colspan
								var lastRowSpan = -1;
								for (var y = 0; y < rows.length; y++) {
									var rowColSpan = 0;

									for (var x = 0; x < rows[y].length; x++) {
										var sd = getColRowSpan(rows[y][x]);

										rowColSpan += sd['colspan'];

										if (lastRowSpan != -1 && sd['rowspan'] != lastRowSpan) {
											alert("Invalid selection for merge.");
											return true;
										}

										lastRowSpan = sd['rowspan'];
									}

									if (rowColSpan > colSpan)
										colSpan = rowColSpan;

									lastRowSpan = -1;
								}

								// Validate vertical and get total rowspan
								var lastColSpan = -1;
								for (var x = 0; x < rows[0].length; x++) {
									var colRowSpan = 0;

									for (var y = 0; y < rows.length; y++) {
										var sd = getColRowSpan(rows[y][x]);

										colRowSpan += sd['rowspan'];

										if (lastColSpan != -1 && sd['colspan'] != lastColSpan) {
											alert("Invalid selection for merge.");
											return true;
										}

										lastColSpan = sd['colspan'];
									}

									if (colRowSpan > rowSpan)
										rowSpan = colRowSpan;

									lastColSpan = -1;
								}

								// Setup td
								tdElm = rows[0][0];
								tdElm.rowSpan = rowSpan;
								tdElm.colSpan = colSpan;

								// Merge cells
								for (var y = 0; y < rows.length; y++) {
									for (var x = 0; x < rows[y].length; x++) {
										var html = rows[y][x].innerHTML;
										var chk = html.replace(/[ \t\r\n]/g, "");

										if (chk != "<br/>" && chk != "<br>" && chk != '<br data-mce-bogus="1"/>' && (x + y > 0))
											tdElm.innerHTML += html;

										// Not current cell
										if (rows[y][x] != tdElm && !rows[y][x]._deleted) {
											var cpos = getCellPos(grid, rows[y][x]);
											var tr = rows[y][x].parentNode;

											tr.removeChild(rows[y][x]);
											rows[y][x]._deleted = true;

											// Empty TR, remove it
											if (!tr.hasChildNodes()) {
												tr.parentNode.removeChild(tr);

												var lastCell = null;
												for (var x = 0; cellElm = getCell(grid, cpos.rowindex, x); x++) {
													if (cellElm != lastCell && cellElm.rowSpan > 1)
														cellElm.rowSpan--;

													lastCell = cellElm;
												}

												if (tdElm.rowSpan > 1)
													tdElm.rowSpan--;
											}
										}
									}
								}

								// Remove all but one bogus br
								each(ed.dom.select('br', tdElm), function (e, i) {
									if (i > 0 && ed.dom.getAttrib(e, 'data-mce-bogus'))
										ed.dom.remove(e);
								});

								break;
						}

						tableElm = inst.dom.getParent(inst.selection.getNode(), "table");
						inst.addVisual(tableElm);
						inst.nodeChanged();
					}
			}
		},

		_insertTable: function (result) {

			var inst = this.editor;
			var html = '<table';

			html += makeAttrib('id', result.get("id"));
			html += makeAttrib('class', result.get("classname"));
			html += makeAttrib('summary', result.get("summary"));
			html += '>';

			for (var y = 0; y < result.get("rows"); y++) {
				html += "<tr>";
				for (var x = 0; x < result.get("cols"); x++) {
					if (!tinymce.isIE)
						html += '<td><br data-mce-bogus="1"/></td>';
					else
						html += '<td></td>';
				}
				html += "</tr>";
			}

			html += "</table>";

			inst.execCommand('mceBeginUndoLevel');

			/*
			* The following goob is here to make sure that  
			* tables dont get positioned inside p elements.
			*/

			var bm = inst.selection.getBookmark(), patt = '';
			inst.execCommand('mceInsertContent', false, '<br class="_mce_marker" />');

			tinymce.each('h1,h2,h3,h4,h5,h6,p'.split(','), function (n) {
				if (patt) {
					patt += ',';
				}
				patt += n + ' ._mce_marker';
			});

			var dom = inst.dom;
			tinymce.each(inst.dom.select(patt), function (n) {
				inst.dom.split(inst.dom.getParent(n, 'h1,h2,h3,h4,h5,h6,p'), n);
			});

			dom.setOuterHTML(dom.select('._mce_marker')[0], html);

			inst.selection.moveToBookmark(bm);

			inst.addVisual();
			inst.execCommand('mceEndUndoLevel');
		},

		/**
		* Update table.
		* @param {HashMap<string><object>}
		*/
		_updateTable: function (result) {

			this.editor.execCommand('mceBeginUndoLevel');

			var dom = this.editor.dom;
			var table = this.editor.dom.getParent(
				this.editor.selection.getNode(),
				"table"
			);
			if (table != null) {
				dom.setAttrib(table, "class", result.get("classname"));
				dom.setAttrib(table, "id", result.get("id"));
				dom.setAttrib(table, "summary", result.get("summary"));
			}

			this.editor.addVisual();
			this.editor.nodeChanged();
			this.editor.execCommand('mceEndUndoLevel');
		},

		/**
		* Update cell.
		* @param {DOMElement} td
		* @param {HashMap<string><object>}
		*/
		_updateTableCell: function (td, result) {

			try {

				if (DOMUtil.getLocalName(td) != result.get("cellType")) {
					var doc = DOMUtil.getParentWindow(td).document;
					var cell = doc.createElement(result.get("cellType"));
					cell.innerHTML = td.innerHTML;
					new List(td.attributes).each(function (att) {
						cell.setAttribute(att.nodeName, att.nodeValue);
					});
					td.parentNode.replaceChild(cell, td);
					td = cell;
				}
				if (result.get("id")) {
					td.id = result.get("id");
				} else {
					td.id = null;
					td.removeAttribute("id");
				}
				if (result.get("classname")) {
					td.className = result.get("classname");
					td.setAttribute("class", result.get("classname"));
				} else {
					td.className = null;
					td.removeAttribute("class");
				}
				if (result.get("align")) {
					td.setAttribute("align", result.get("align"));
				} else {
					td.removeAttribute("align");
				}
				if (result.get("valign")) {
					td.setAttribute("valign", result.get("valign"));
				} else {
					td.removeAttribute("valign");
				}
				if (result.get("width")) {
					td.setAttribute("width", result.get("width"));
				} else {
					td.removeAttribute("width");
				}

			} catch (e) {
				alert(e);
				SystemDebug.stack(arguments);
			}
		},

		/**
		* Update row.
		* @param {DOMElement} td
		* @param {HashMap<string><object>}
		*/
		_updateTableRow: function (tr, result) {

			var currentposition = DOMUtil.getLocalName(tr.parentNode).toLowerCase();
			var position = result.get("rowtype");

			if (position != currentposition) {
				var row = tr.cloneNode(true);
				var table = this.editor.dom.getParent(tr, "table");
				var target = null;
				switch (position) {
					case "thead":
						target = table.createTHead();
						break;
					case "tfoot":
						target = table.createTFoot();
						break;
					case "tbody":
						target = table.getElementsByTagName("tbody").item(0);
						break;
				}
				target.appendChild(row);
				tr.parentNode.removeChild(tr);
				tr = row;
			}

			if (result.get("classname")) {
				tr.className = result.get("classname");
				tr.setAttribute("class", result.get("classname"));
			} else {
				tr.className = "";
				tr.removeAttribute("class");
			}
			if (result.get("align")) {
				tr.setAttribute("align", result.get("align"));
			} else {
				tr.removeAttribute("align");
			}
			if (result.get("valign")) {
				tr.setAttribute("valign", result.get("valign"));
			} else {
				tr.removeAttribute("valign");
			}
		}
	});

	// Register plugin
	tinymce.PluginManager.add("compositetable", tinymce.plugins.CompositeTablePlugin);
};
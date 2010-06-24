/* Import plugin specific language pack */
tinyMCE.importPluginLanguagePack('table');

var TinyMCE_CompositeTablePlugin = {

	URL_TABLE 	: "${tinymce}/plugins/compositetable/table.aspx",
	URL_ROW 	: "${tinymce}/plugins/compositetable/row.aspx",
	URL_CELL 	: "${tinymce}/plugins/compositetable/cell.aspx",
	URL_MERGE	: "${tinymce}/plugins/compositetable/merge.aspx",
	
	logger : SystemLogger.getLogger ( "TinyMCE_CompositeTablePlugin" ),

	/**
	 * Returns information about the plugin as a name/value array.
	 * The current keys are longname, author, authorurl, infourl and version.
	 * @returns Name/value array containing information about the plugin.
	 * @type Array 
	 */
	getInfo : function() {
		return {
			longname 	: "Composite Table Plugin",
			author 		: "Wired Earp",
			authorurl 	: "http://www.composite.net",
			infourl 	: null,
			version 	: "1.0"
		};
	},

	initInstance : function(inst) {
		if (tinyMCE.isGecko) {
			var doc = inst.getDoc();
			tinyMCE.addEvent(doc, "mouseup", TinyMCE_CompositeTablePlugin._mouseDownHandler);
		}

		inst.tableRowClipboard = null;
	},

	/**
	 * Executes the table commands.
	 */
	execCommand : function(editor_id, element, command, user_interface, value) {
		// Is table command
		switch (command) {
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
				var inst = tinyMCE.getInstanceById(editor_id);

				inst.execCommand('mceBeginUndoLevel');
				TinyMCE_CompositeTablePlugin._doExecCommand(editor_id, element, command, user_interface, value);
				inst.execCommand('mceEndUndoLevel');

				return true;
		}

		// Pass to next handler in chain
		return false;
	},
	
	handleNodeChange : function(editor_id, node, undo_index, undo_levels, visual_aid, any_selection) {
		
		/*
		 * Fixes a bug in FF3.0 where the cursor gets stuck in  
		 * a table when the table is the last element on page. 
		 * Also see comments way below in this file...
		 */
		if ( top.Client && top.Client.isMozilla ) {
			var body = tinyMCE.selectedInstance.getBody ();
			if ( body.hasChildNodes ()) {
				if ( body.lastChild.nodeName.toLowerCase () == "table" ) {
					body.appendChild ( body.ownerDocument.createElement ( "br" ));
				}
			}
		}
	},

	// Private plugin internal methods

	_mouseDownHandler : function(e) {
		var elm = tinyMCE.isMSIE ? event.srcElement : e.target;
		var focusElm = tinyMCE.selectedInstance.getFocusElement();

		// If press on special Mozilla create TD/TR thingie
		if (elm.nodeName == "BODY" && (focusElm.nodeName == "TD" || focusElm.nodeName == "TH" || (focusElm.parentNode && focusElm.parentNode.nodeName == "TD") ||(focusElm.parentNode && focusElm.parentNode.nodeName == "TH") )) {
			window.setTimeout(function() {
				var tableElm = tinyMCE.getParentElement(focusElm, "table");
				tinyMCE.handleVisualAid(tableElm, true, tinyMCE.settings['visual'], tinyMCE.selectedInstance);
			}, 10);
		}
	},

	/**
	 * Executes the table commands.
	 */
	_doExecCommand : function(editor_id, element, command, user_interface, value) {
	
		var inst = tinyMCE.getInstanceById(editor_id);
		var focusElm = inst.getFocusElement();
		var trElm = tinyMCE.getParentElement(focusElm, "tr");
		var tdElm = tinyMCE.getParentElement(focusElm, "td,th");
		var tableElm = tinyMCE.getParentElement(focusElm, "table");
		var doc = inst.contentWindow.document;
		var tableBorder = tableElm ? tableElm.getAttribute("border") : "";

		// Get first TD if no TD found
		if (trElm && tdElm == null)
			tdElm = trElm.cells[0];

		// ------- Inner functions ---------
		function inArray(ar, v) {
			for (var i=0; i<ar.length; i++) {
				// Is array
				if (ar[i].length > 0 && inArray(ar[i], v))
					return true;

				// Found value
				if (ar[i] == v)
					return true;
			}

			return false;
		}

		function makeTD() {
			var newTD = doc.createElement("td");
			newTD.innerHTML = "&nbsp;";
		}

		function getColRowSpan(td) {
			var colspan = tinyMCE.getAttrib(td, "colspan");
			var rowspan = tinyMCE.getAttrib(td, "rowspan");

			colspan = colspan == "" ? 1 : parseInt(colspan);
			rowspan = rowspan == "" ? 1 : parseInt(rowspan);

			return {colspan : colspan, rowspan : rowspan};
		}

		function getCellPos(grid, td) {
			var x, y;

			for (y=0; y<grid.length; y++) {
				for (x=0; x<grid[y].length; x++) {
					if (grid[y][x] == td)
						return {cellindex : x, rowindex : y};
				}
			}

			return null;
		}

		function getCell(grid, row, col) {
			if (grid[row] && grid[row][col])
				return grid[row][col];

			return null;
		}

		function getTableGrid(table) {
			var grid = new Array(), rows = table.rows, x, y, td, sd, xstart, x2, y2;

			for (y=0; y<rows.length; y++) {
				for (x=0; x<rows[y].cells.length; x++) {
					td = rows[y].cells[x];
					sd = getColRowSpan(td);

					// All ready filled
					for (xstart = x; grid[y] && grid[y][xstart]; xstart++) ;

					// Fill box
					for (y2=y; y2<y+sd['rowspan']; y2++) {
						if (!grid[y2])
							grid[y2] = new Array();

						for (x2=xstart; x2<xstart+sd['colspan']; x2++)
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

				for (var x=0; td = getCell(grid, cpos.rowindex, x); x++) {
					var remove = true;
					var sd = getColRowSpan(td);

					// Remove due to rowspan
					if (inArray(cells, td)) {
						new_tr.childNodes[x]._delete = true;
					} else if ((lastElm == null || td != lastElm) && sd.colspan > 1) { // Remove due to colspan
						for (var i=x; i<x+td.colSpan; i++)
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
				for (var i=0; i<namesAr.length; i++) {
					if (node.nodeName.toLowerCase() == namesAr[i].toLowerCase() )
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
			for (var i=1; i<rowspan && trNext; i++) {
				var newTD = doc.createElement("td");
				newTD.innerHTML = "&nbsp;";

				if (tinyMCE.isMSIE)
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
			var tableBorder = tinyMCE.getAttrib(table, "border");
			var tdElm = null;

			for (var x=0; tdElm = getCell(grid, cpos.rowindex, x); x++) {
				var newTD = null;

				if (lastCell != tdElm) {
					for (var i=0; i<tr.cells.length; i++) {
						if (tdElm == tr.cells[i]) {
							newTD = tdElm.cloneNode(true);
							break;
						}
					}
				}

				if (newTD == null) {
					newTD = doc.createElement("td");
					newTD.innerHTML = "&nbsp;";
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
			case "mceTableRowProps":
				
				if (trElm != null) {
					
					TinyMCE_CompositeTheme.enableDialogMode ();
					
					var dialogArgument = {
						tinyWindow		: window,
						tinyElement 	: trElm
					}

					var dialogHandler = {
						handleDialogResponse : function ( response, result ) {
						
							TinyMCE_CompositeTheme.disableDialogMode ()
							
							if ( response == Dialog.RESPONSE_ACCEPT ) {
							
								switch ( result.get ( "action" )) {
									case "row" :
										TinyMCE_CompositeTablePlugin._updateTableRow ( trElm, result );
										break;
									case "all" :
										new List ( tableElm.rows ).each ( function ( row ) {
											TinyMCE_CompositeTablePlugin._updateTableRow ( row, result );
										});
										break;
									case "odd" :
									case "even" :
										var i = 0;
										new List ( tableElm.rows ).each ( function ( row ) {
											if ((i % 2 == 0 && result.get ( "action" ) == "odd") || (i % 2 != 0 && result.get ( "action" ) == "even")) {
												TinyMCE_CompositeTablePlugin._updateTableRow ( row, result );
											}
											i++;
										});
										break;
								}
								tinyMCE.triggerNodeChange();
							}
						}
					}
					
					// open dialog
					Dialog.invokeModal ( 
						TinyMCE_CompositeTablePlugin.URL_ROW, 
						dialogHandler, 
						dialogArgument 
					);
					
					return true;
				}
				break;
				
			case "mceTableCellProps":
			
				if (tdElm != null) {
					
					TinyMCE_CompositeTheme.enableDialogMode ();
					
					// dialog argument.
					var dialogArgument = {
						tinyWindow	: window,
						tinyElement : tdElm
					}
					
					var dialogHandler = {
						handleDialogResponse : function ( response, result ) {
							
							TinyMCE_CompositeTheme.disableDialogMode ()
							
							if ( response == Dialog.RESPONSE_ACCEPT ) {
								
								switch ( result.get ( "action" ) ) {
									case "cell" :
										TinyMCE_CompositeTablePlugin._updateTableCell ( tdElm, result );
										break;
									case "row" :
										new List ( tdElm.parentNode.cells ).each ( function ( cell ) {
											TinyMCE_CompositeTablePlugin._updateTableCell ( cell, result );
										});
										break;
									case "all" :
										new List ( tableElm.rows ).each ( function ( row ) {
											new List ( row.cells ).each ( function ( cell ) {
												TinyMCE_CompositeTablePlugin._updateTableCell ( cell, result );
											});
										});
										break;
								}
								tinyMCE.handleVisualAid(inst.getBody(), true, inst.visualAid, inst);
								tinyMCE.triggerNodeChange();
							}
						}
					}
					
					// open dialog
					Dialog.invokeModal ( 
						TinyMCE_CompositeTablePlugin.URL_CELL, 
						dialogHandler, 
						dialogArgument 
					);
				}

				return true;

			case "mceInsertTable":
			
				if (user_interface) {
				
					TinyMCE_CompositeTheme.enableDialogMode ();
					
					// when updating, pinpoint the target table
					var table = null;
					
					if ( value == "update" ) {
						table = tinyMCE.getParentElement ( 
							tinyMCE.selectedInstance.getFocusElement (), 
							"table" 
						);
					}
					
					// construct dialog argument.
					var dialogArgument = {
						tinyWindow	: window,
						tinyElement : table,
						tinyAction 	: value
					}
					
					// construct dialog handler.
					var dialogHandler = {
						handleDialogResponse : function ( response, result ) {
							
							TinyMCE_CompositeTheme.disableDialogMode ();
							
							if ( response == Dialog.RESPONSE_ACCEPT ) {
								switch ( dialogArgument.tinyAction ) {
									case "insert" :
										TinyMCE_CompositeTablePlugin._insertTable ( result );
										break;
									case "update" :
										TinyMCE_CompositeTablePlugin._updateTable ( result );
										break;
								}
								tinyMCE.triggerNodeChange ();
							}
						}
					}
					
					// open dialog
					Dialog.invokeModal ( 
						TinyMCE_CompositeTablePlugin.URL_TABLE, 
						dialogHandler, 
						dialogArgument 
					);
				}

				return true;

			case "mceTableDelete":
				var table = tinyMCE.getParentElement(inst.getFocusElement(), "table");
				if (table) {
					table.parentNode.removeChild(table);
					inst.repaint();
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
							for (var x=0; tdElm = getCell(grid, cpos.rowindex, x); x++) {
								if (tdElm != lastTDElm) {
									var sd = getColRowSpan(tdElm);

									if (sd['rowspan'] == 1) {
										var newTD = doc.createElement("td");

										newTD.innerHTML = "&nbsp;";
										newTD.colSpan = tdElm.colSpan;

										newTR.appendChild(newTD);
									} else
										tdElm.rowSpan = sd['rowspan'] + 1;

									lastTDElm = tdElm;
								}
							}

							trElm.parentNode.insertBefore(newTR, trElm);

							grid = getTableGrid(tableElm);
							inst.selection.selectNode(getCell(grid, cpos.rowindex + 1, cpos.cellindex), tinyMCE.isGecko, true); // Only collape on gecko
						break;

						case "mceTableInsertRowAfter":
							if (!trElm || !tdElm)
								return true;

							var grid = getTableGrid(tableElm);
							var cpos = getCellPos(grid, tdElm);
							var newTR = doc.createElement("tr");
							var lastTDElm = null;

							// Create cells
							for (var x=0; tdElm = getCell(grid, cpos.rowindex, x); x++) {
								if (tdElm != lastTDElm) {
									var sd = getColRowSpan(tdElm);

									if (sd['rowspan'] == 1) {
										var newTD = doc.createElement("td");

										newTD.innerHTML = "&nbsp;";
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

							grid = getTableGrid(tableElm);
							inst.selection.selectNode(getCell(grid, cpos.rowindex, cpos.cellindex), tinyMCE.isGecko, true); // Only collape on gecko
						break;

						case "mceTableDeleteRow":
							if (!trElm || !tdElm)
								return true;

							var grid = getTableGrid(tableElm);
							var cpos = getCellPos(grid, tdElm);

							// Only one row, remove whole table
							if (grid.length == 1) {
								tableElm = tinyMCE.getParentElement(tableElm, "table"); // Look for table instead of tbody
								tableElm.parentNode.removeChild(tableElm);
								return true;
							}

							// Move down row spanned cells
							var cells = trElm.cells;
							var nextTR = nextElm(trElm, "TR");
							for (var x=0; x<cells.length; x++) {
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
							for (var x=0; tdElm = getCell(grid, cpos.rowindex, x); x++) {
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

							cpos.rowindex--;
							if (cpos.rowindex < 0)
								cpos.rowindex = 0;

							// Recalculate grid and select
							grid = getTableGrid(tableElm);
							inst.selection.selectNode(getCell(grid, cpos.rowindex, 0), tinyMCE.isGecko, true); // Only collape on gecko
						break;

						case "mceTableInsertColBefore":
							if (!trElm || !tdElm)
								return true;

							var grid = getTableGrid(tableElm);
							var cpos = getCellPos(grid, tdElm);
							var lastTDElm = null;

							for (var y=0; tdElm = getCell(grid, y, cpos.cellindex); y++) {
								if (tdElm != lastTDElm) {
									var sd = getColRowSpan(tdElm);

									if (sd['colspan'] == 1) {
										var newTD = doc.createElement(tdElm.nodeName);

										newTD.innerHTML = "&nbsp;";
										newTD.rowSpan = tdElm.rowSpan;

										tdElm.parentNode.insertBefore(newTD, tdElm);
									} else
										tdElm.colSpan++;

									lastTDElm = tdElm;
								}
							}

							grid = getTableGrid(tableElm);
							inst.selection.selectNode(getCell(grid, cpos.rowindex, cpos.cellindex + 1), tinyMCE.isGecko, true); // Only collape on gecko
						break;

						case "mceTableInsertColAfter":
							if (!trElm || !tdElm)
								return true;

							var grid = getTableGrid(tableElm);
							var cpos = getCellPos(grid, tdElm);
							var lastTDElm = null;

							for (var y=0; tdElm = getCell(grid, y, cpos.cellindex); y++) {
								if (tdElm != lastTDElm) {
									var sd = getColRowSpan(tdElm);

									if (sd['colspan'] == 1) {
										var newTD = doc.createElement(tdElm.nodeName);

										newTD.innerHTML = "&nbsp;";
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

							grid = getTableGrid(tableElm);
							inst.selection.selectNode(getCell(grid, cpos.rowindex, cpos.cellindex), tinyMCE.isGecko, true); // Only collape on gecko
						break;

						case "mceTableDeleteCol":
							if (!trElm || !tdElm)
								return true;

							var grid = getTableGrid(tableElm);
							var cpos = getCellPos(grid, tdElm);
							var lastTDElm = null;

							// Only one col, remove whole table
							if (grid.length > 1 && grid[0].length <= 1) {
								tableElm = tinyMCE.getParentElement(tableElm, "table"); // Look for table instead of tbody
								tableElm.parentNode.removeChild(tableElm);
								return true;
							}

							// Delete cells
							for (var y=0; tdElm = getCell(grid, y, cpos.cellindex); y++) {
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

							cpos.cellindex--;
							if (cpos.cellindex < 0)
								cpos.cellindex = 0;

							// Recalculate grid and select
							grid = getTableGrid(tableElm);
							inst.selection.selectNode(getCell(grid, cpos.rowindex, 0), tinyMCE.isGecko, true); // Only collape on gecko
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
							for (var i=1; i<colspan; i++) {
								var newTD = doc.createElement("td");

								newTD.innerHTML = "&nbsp;";

								trElm.insertBefore(newTD, nextElm(tdElm, "TD,TH"));

								if (rowspan > 1)
									addRows(newTD, trElm, rowspan);
							}

							addRows(tdElm, trElm, rowspan);
						}

						// Apply visual aids
						tableElm = tinyMCE.getParentElement(inst.getFocusElement(), "table");
						break;

					case "mceTableMergeCells":
						
						
						var rows = new Array();
						var sel = inst.getSel();
						var grid = getTableGrid(tableElm);

						if (tinyMCE.isMSIE || sel.rangeCount == 1) {
							if (user_interface) {
							
								TinyMCE_CompositeTheme.enableDialogMode ();
							
								var sp = getColRowSpan(tdElm);
								var dialogArgument = {
									tinyWindow		: window,
									tinyElement		: null,
									numcols 		: sp.colspan, 
									numrows 		: sp.rowspan
								}
							
								var dialogHandler = {
									handleDialogResponse : function ( response, result ) {
									
										TinyMCE_CompositeTheme.disableDialogMode ();
										
										if ( response == Dialog.RESPONSE_ACCEPT ) {
											var args = new Array();
											args["numcols"] = result.get ( "numcols" );
											args["numrows"] = result.get ( "numrows" );
											inst.execCommand (
												"mceTableMergeCells", false, args
											);
										}
									}
								}
							
								// open dialog
								Dialog.invokeModal ( 
									TinyMCE_CompositeTablePlugin.URL_MERGE, 
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
								for (var y=cpos.rowindex; y<grid.length; y++) {
									var rowCells = new Array();

									for (var x=cpos.cellindex; x<grid[y].length; x++) {
										var td = getCell(grid, y, x);

										if (td && !inArray(rows, td) && !inArray(rowCells, td)) {
											var cp = getCellPos(grid, td);

											// Within range
											if (cp.cellindex < cpos.cellindex+numCols && cp.rowindex < cpos.rowindex+numRows)
												rowCells[rowCells.length] = td;
										}
									}

									if (rowCells.length > 0)
										rows[rows.length] = rowCells;
								}

								//return true;
							}
						} else {
							var cells = new Array();
							var sel = inst.getSel();
							var lastTR = null;
							var curRow = null;
							var x1 = -1, y1 = -1, x2, y2;

							// Only one cell selected, whats the point?
							if (sel.rangeCount < 2)
								return true;

							// Get all selected cells
							for (var i=0; i<sel.rangeCount; i++) {
								var rng = sel.getRangeAt(i);
								var tdElm = rng.startContainer.childNodes[rng.startOffset];

								if (!tdElm)
									break;

								if (tdElm.nodeName == "TD")
									cells[cells.length] = tdElm;
							}

							// Get rows and cells
							var tRows = tableElm.rows;
							for (var y=0; y<tRows.length; y++) {
								var rowCells = new Array();

								for (var x=0; x<tRows[y].cells.length; x++) {
									var td = tRows[y].cells[x];

									for (var i=0; i<cells.length; i++) {
										if (td == cells[i]) {
											rowCells[rowCells.length] = td;
										}
									}
								}

								if (rowCells.length > 0)
									rows[rows.length] = rowCells;
							}

							// Find selected cells in grid and box
							var curRow = new Array();
							var lastTR = null;
							for (var y=0; y<grid.length; y++) {
								for (var x=0; x<grid[y].length; x++) {
									grid[y][x]._selected = false;

									for (var i=0; i<cells.length; i++) {
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
							for (var y=y1; y<=y2; y++) {
								for (var x=x1; x<=x2; x++) {
									if (!grid[y][x]._selected) {
										Dialog.warning ( "Merge Aborted", "Invalid selection for merge." );
										return true;
									}
								}
							}
						}

						// Validate selection and get total rowspan and colspan
						var rowSpan = 1, colSpan = 1;

						// Validate horizontal and get total colspan
						var lastRowSpan = -1;
						for (var y=0; y<rows.length; y++) {
							var rowColSpan = 0;

							for (var x=0; x<rows[y].length; x++) {
								var sd = getColRowSpan(rows[y][x]);

								rowColSpan += sd['colspan'];

								if (lastRowSpan != -1 && sd['rowspan'] != lastRowSpan) {
									Dialog.warning ( "Merge Aborted", "Invalid selection for merge." );
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
						for (var x=0; x<rows[0].length; x++) {
							var colRowSpan = 0;

							for (var y=0; y<rows.length; y++) {
								var sd = getColRowSpan(rows[y][x]);

								colRowSpan += sd['rowspan'];

								if (lastColSpan != -1 && sd['colspan'] != lastColSpan) {
									Dialog.warning ( "Merge Aborted", "Invalid selection for merge." );
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
						for (var y=0; y<rows.length; y++) {
							for (var x=0; x<rows[y].length; x++) {
								var html = rows[y][x].innerHTML;
								var chk = tinyMCE.regexpReplace(html, "[ \t\r\n]", "");

								if (chk != "<br/>" && chk != "<br>" && chk != "&nbsp;" && (x+y > 0))
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
										for (var x=0; cellElm = getCell(grid, cpos.rowindex, x); x++) {
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
						break;
					}

					tableElm = tinyMCE.getParentElement(inst.getFocusElement(), "table");
					tinyMCE.handleVisualAid(tableElm, true, tinyMCE.settings['visual'], tinyMCE.selectedInstance);
					tinyMCE.triggerNodeChange();
					inst.repaint();
				}

			return true;
		}

		// Pass to next handler in chain
		return false;
	},
	
	/*
	 * @param {HashMap<string><object>} result
	 */
	_insertTable : function ( result ) {
		
		/*
		function makeAttrib ( attrib, value ) {
			
			var res = "";
			
			if ( value ) {
				res = value.replace(/&/g, '&amp;');
				res = value.replace(/\"/g, '&quot;');
				res = value.replace(/</g, '&lt;');
				res = value.replace(/>/g, '&gt;');
				res = ' ' + attrib + '="' + value + '"';
			}
			return res;
		}
		*/	
	
		/* TEMP */
		var border = 0;
		
		var html = '<table';
		html += makeAttrib ( 'id', result.get ( "id" ));
		html += makeAttrib ( 'summary', result.get ( "summary" ));
		html += makeAttrib ( 'class', tinyMCE.getVisualAidClass ( result.get ( "classname" ), border == 0 ));
		html += '>';
		
		for ( var y=0; y < result.get ( "rows" ); y++ ) {
			html += "<tr>";
			for ( var x=0; x < result.get ( "cols" ); x++ ) {
				html += '<td>&nbsp;</td>';
			}
			html += "</tr>";
		}
		html += "</table>";
		
		/*
		 * FF3 introdocues a bug where the cursor cannot leave the table 
		 * if the table is the last element on the page. This seems to hack it. 
		 * Haven't found the bug number, but a comment was found on this page: 
		 * http://tinymce.moxiecode.com/punbb/viewtopic.php?id=12007
		 */
		if ( top.Client != null && top.Client.isMozilla ) {
			html += "<br/>";
		}
		
		var inst = tinyMCE.selectedInstance;
		inst.execCommand('mceBeginUndoLevel');
		inst.execCommand('mceInsertContent', false, html );
		tinyMCE.handleVisualAid ( inst.getBody(), true, tinyMCE.settings['visual']);
		inst.execCommand('mceEndUndoLevel');
	},
	
	/**
	 * Update table.
	 * @param {HashMap<string><object>}
	 */
	_updateTable : function ( result ) {
		
		var table = tinyMCE.getParentElement ( 
			tinyMCE.selectedInstance.getFocusElement (), 
			"table" 
		);
		if ( table ) {
			if ( result.get ( "classname" ) ) {
				var classname = tinyMCE.getVisualAidClass ( result.get ( "classname" ), true );
				table.className = classname; // true what?
				table.setAttribute ( "class", classname );
			}
			if ( result.get ( "id" )) {
				table.id = result.get ( "id" );
			}
			if ( result.get ( "summary" )) {
				table.summary = result.get ( "summary" );
			}
		}
	},
	
	/**
	 * Update cell.
	 * @param {DOMElement} td
	 * @param {HashMap<string><object>}
	 */
	_updateTableCell : function ( td, result ) {
		
		if ( DOMUtil.getLocalName ( td ) != result.get ( "cellType" )) {
			var doc = DOMUtil.getParentWindow ( td ).document;
			var cell = doc.createElement ( result.get ( "cellType" ));
			cell.innerHTML = td.innerHTML;
			new List ( td.attributes ).each ( function ( att ) {
				cell.setAttribute ( att.nodeName, att.nodeValue );
			});
			td.parentNode.replaceChild ( cell, td );
			td = cell;
		}
		if ( result.get ( "id" )) {
			td.id = result.get ( "id" );
		} else {
			td.id = null;
			td.removeAttribute ( "id" );	
		}
		if ( result.get ( "classname" )) {
			td.className = result.get ( "classname" );
			td.setAttribute ( "class", result.get ( "classname" ));
		} else {
			td.className = null;
			td.removeAttribute ( "class" );
		}
		if ( result.get ( "align" )) {
			td.setAttribute( "align", result.get ( "align" ));
		} else {
			td.removeAttribute ( "align" );
		}
		if ( result.get ( "valign" )) {
			td.setAttribute( "valign", result.get ( "valign" ));
		} else {
			td.removeAttribute ( "valign" );
		}
		if ( result.get ( "width" )) {
			td.setAttribute( "width", result.get ( "width" ));
		} else {
			td.removeAttribute ( "width" );
		}
	},
	
	/**
	 * Update row.
	 * @param {DOMElement} td
	 * @param {HashMap<string><object>}
	 */
	_updateTableRow : function ( tr, result ) {
	
		var currentposition = DOMUtil.getLocalName ( tr.parentNode ).toLowerCase ();
		var position = result.get ( "rowtype" );
		
		if ( position != currentposition ) {
			var row = tr.cloneNode ( true );
			var table = tinyMCE.getParentElement ( tr, "table" );
			var target = null;
			switch ( position ) {
				case "thead" :
					target = table.createTHead ();
					break;
				case "tfoot" :
					target = table.createTFoot ();
					break;
				case "tbody" :
					target = table.getElementsByTagName ( "tbody" ).item ( 0 );
					break;
			}
			target.appendChild ( row );
			tr.parentNode.removeChild ( tr );
			tr = row;
		}
		
		if ( result.get ( "classname" )) {
			tr.className = result.get ( "classname" );
			tr.setAttribute ( "class", result.get ( "classname" ));
		} else {
			tr.className = "";
			tr.removeAttribute ( "class" );
		}
		if ( result.get ( "align" )) {
			tr.setAttribute( "align", result.get ( "align" ));
		} else {
			tr.removeAttribute ( "align" );
		}
		if ( result.get ( "valign" )) {
			tr.setAttribute( "valign", result.get ( "valign" ));
		} else {
			tr.removeAttribute ( "valign" );
		}
	}
};

tinyMCE.addPlugin("compositetable", TinyMCE_CompositeTablePlugin);

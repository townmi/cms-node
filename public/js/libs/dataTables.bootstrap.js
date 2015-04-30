
define(function(require, exports, module){

	return function ( $, DataTable ) {

		"use strict";

		/* Set the defaults for DataTables initialisation */
		$.extend( true, DataTable.defaults, {
			dom:
				"<'row'<'col-sm-6'l><'col-sm-6'f>>" +
				"<'row'<'col-sm-12'tr>>" +
				"<'row'<'col-sm-3'i><'col-sm-9'p>>",
			renderer: 'bootstrap'
		} );


		/* Default class modification */
		$.extend( DataTable.ext.classes, {
			sWrapper:      "dataTables_wrapper form-inline dt-bootstrap",
			sFilterInput:  "form-control input-sm",
			sLengthSelect: "form-control input-sm"
		} );



		/* Set the defaults for DataTables initialisation */
		
		$.extend( true, $.fn.dataTable.defaults, {
		    "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
		    "sPaginationType": "bootstrap",
		    "oLanguage": {
		        "sSearch": "快速搜索:",
		        "bAutoWidth": true,
		        "sLengthMenu": "每页显示 _MENU_ 条记录",
		        "sInfo": "当前<span> _START_ </span>到<span> _END_ </span>&nbsp;共&nbsp;<span> _TOTAL_ </span>条数据",
		        "oPaginate": {
		            "sPrevious": "上一页",
		            "sNext":     "下一页",
		            "sLast":     "页尾",
		            "sFirst":    "首页"
		        }
		    }
		} );
		 
		 
		/* Default class modification */
		
		$.extend( $.fn.dataTableExt.oStdClasses, {
		    "sWrapper": "dataTables_wrapper form-inline"
		} );
		 
		 
		/* API method to get paging information */
		
		$.fn.dataTableExt.oApi.fnPagingInfo = function ( oSettings )
		{
		    return {
		        "iStart":         oSettings._iDisplayStart,
		        "iEnd":           oSettings.fnDisplayEnd(),
		        "iLength":        oSettings._iDisplayLength,
		        "iTotal":         oSettings.fnRecordsTotal(),
		        "iFilteredTotal": oSettings.fnRecordsDisplay(),
		        "iPage":          Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength ),
		        "iTotalPages":    Math.ceil( oSettings.fnRecordsDisplay() / oSettings._iDisplayLength )
		    };
		};
		 
		     
		 
		 
		/* Bootstrap style pagination control */

		$.extend( $.fn.dataTableExt.oPagination, {
		    "bootstrap": {
		        "fnInit": function( oSettings, nPaging, fnDraw ) {
		            var oLang = oSettings.oLanguage.oPaginate;
		            var fnClickHandler = function ( e ) {
		                e.preventDefault();
		                if ( oSettings.oApi._fnPageChange(oSettings, e.data.action) ) {
		                    fnDraw( oSettings );
		                }
		            };

		            $(nPaging).addClass('pagination_simple_numbers').append(
		                '<ul class="pagination">'+
		                '<li class="first disabled paginate_button"><a href="#">'+oLang.sFirst+'</a></li>'+
		                '<li class="prev disabled paginate_button"><a href="#">'+oLang.sPrevious+'</a></li>'+
		                '<li class="next disabled paginate_button"><a href="#">'+oLang.sNext+'</a></li>'+
		                '<li class="last disabled paginate_button"><a href="#">'+oLang.sLast+'</a></li>'+
		                '</ul><div style="margin: 2px 0; float: right; margin-left:20px;" class="form-group input-group">'+
		                '<input type="text" id="redirect" class="form-control input-sm" style="width: 60px; height:34px;">'+
		                '<a href="javascript:;" class="btn btn-outline btn-primary input-group-addon" id="pagination_btn_go">go</a></div>'
		                );
		 
		            //datatables分页跳转
		            $(nPaging).find("#pagination_btn_go").on("click", function(){

		            	var value = $(this).parent().find("#redirect").val();

		            	var ipage = parseInt(value);
		                var oPaging = oSettings.oInstance.fnPagingInfo();
		                if(isNaN(ipage) || ipage<1){
		                    ipage = 1;
		                }else if(ipage>oPaging.iTotalPages){
		                    ipage=oPaging.iTotalPages;
		                }
		                $(this).val(ipage);
		                ipage--;
		                oSettings._iDisplayStart = ipage * oPaging.iLength;
		                fnDraw( oSettings );
		            })
		 
		            var els = $('a', nPaging);
		            $(els[0]).bind( 'click.DT', {
		                action: "first"
		            }, fnClickHandler );
		            $(els[1]).bind( 'click.DT', {
		                action: "previous"
		            }, fnClickHandler );
		            $(els[2]).bind( 'click.DT', {
		                action: "next"
		            }, fnClickHandler );
		            $(els[3]).bind( 'click.DT', {
		                action: "last"
		            }, fnClickHandler );
		        },

		        "fnUpdate": function ( oSettings, fnDraw ) {
		            var iListLength = 3;
		            var oPaging = oSettings.oInstance.fnPagingInfo();
		            var an = oSettings.aanFeatures.p;
		            var i, ien, j, sClass, iStart, iEnd, iHalf=Math.floor(iListLength/2);
		 
		            if ( oPaging.iTotalPages < iListLength) {
		                iStart = 1;
		                iEnd = oPaging.iTotalPages;
		            }
		            else if ( oPaging.iPage <= iHalf ) {
		                iStart = 1;
		                iEnd = iListLength;
		            } else if ( oPaging.iPage >= (oPaging.iTotalPages-iHalf) ) {
		                iStart = oPaging.iTotalPages - iListLength + 1;
		                iEnd = oPaging.iTotalPages;
		            } else {
		                iStart = oPaging.iPage - iHalf + 1;
		                iEnd = iStart + iListLength - 1;
		            }
		 
		            for ( i=0, ien=an.length ; i<ien ; i++ ) {
		                // Remove the middle elements
		                ($('li:gt(1)', an[i]).filter(':not(:last)')).filter(':not(:last)').remove();
		 
		                // Add the new list items and their event handlers
		                for ( j=iStart ; j<=iEnd ; j++ ) {
		                    sClass = (j==oPaging.iPage+1) ? 'class="active"' : '';
		                    $('<li '+sClass+'><a href="#">'+j+'</a></li>')
		                    .insertBefore( $('.next', an[i])[0] )
		                    .bind('click', function (e) {
		                        e.preventDefault();
		                        oSettings._iDisplayStart = (parseInt($('a', this).text(),10)-1) * oPaging.iLength;
		                        fnDraw( oSettings );
		                    } );
		                }
		 
		                // Add / remove disabled classes from the static elements
		                if ( oPaging.iPage === 0 ) {
		                    $('li:lt(2)', an[i]).addClass('disabled');
		                } else {
		                    $('li:lt(2)', an[i]).removeClass('disabled');
		                }
		 
		                if ( oPaging.iPage === oPaging.iTotalPages-1 || oPaging.iTotalPages === 0 ) {
		                    $('.next', an[i]).addClass('disabled');
		                    $('li:last', an[i]).addClass('disabled');
		                } else {
		                    $('.next', an[i]).removeClass('disabled');
		                    $('li:last', an[i]).removeClass('disabled');
		                }
		            }
		        }
		        
		    }
		} );
		 
		
		/* Bootstrap paging button renderer */
		/*
		DataTable.ext.renderer.pageButton.bootstrap = function ( settings, host, idx, buttons, page, pages ) {

			var api     = new DataTable.Api( settings );
			var classes = settings.oClasses;
			var lang    = settings.oLanguage.oPaginate;
			var btnDisplay, btnClass;

			var attach = function( container, buttons ) {
				var i, ien, node, button;
				var clickHandler = function ( e ) {
					e.preventDefault();
					if ( !$(e.currentTarget).hasClass('disabled') ) {
						api.page( e.data.action ).draw( false );
					}
				};

				for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
					button = buttons[i];

					if ( $.isArray( button ) ) {
						attach( container, button );
					}
					else {
						btnDisplay = '';
						btnClass = '';

						switch ( button ) {
							case 'ellipsis':
								btnDisplay = '&hellip;';
								btnClass = 'disabled';
								break;

							case 'first':
								btnDisplay = lang.sFirst;
								btnClass = button + (page > 0 ?
									'' : ' disabled');
								break;

							case 'previous':
								btnDisplay = lang.sPrevious;
								btnClass = button + (page > 0 ?
									'' : ' disabled');
								break;

							case 'next':
								btnDisplay = lang.sNext;
								btnClass = button + (page < pages-1 ?
									'' : ' disabled');
								break;

							case 'last':
								btnDisplay = lang.sLast;
								btnClass = button + (page < pages-1 ?
									'' : ' disabled');
								break;

							default:
								btnDisplay = button + 1;
								btnClass = page === button ?
									'active' : '';
								break;
						}

						if ( btnDisplay ) {
							node = $('<li>', {
									'class': classes.sPageButton+' '+btnClass,
									'aria-controls': settings.sTableId,
									'tabindex': settings.iTabIndex,
									'id': idx === 0 && typeof button === 'string' ?
										settings.sTableId +'_'+ button :
										null
								} )
								.append( $('<a>', {
										'href': '#'
									} )
									.html( btnDisplay )
								)
								.appendTo( container );

							settings.oApi._fnBindAction(
								node, {action: button}, clickHandler
							);
						}
					}
				}
			};

			attach(
				$(host).empty().html('<ul class="pagination"/>').children('ul'),
				buttons
			);
		};
		

		/*
		 * TableTools Bootstrap compatibility
		 * Required TableTools 2.1+
		 */

		
		if ( DataTable.TableTools ) {
			// Set the classes that TableTools uses to something suitable for Bootstrap
			$.extend( true, DataTable.TableTools.classes, {
				"container": "DTTT btn-group",
				"buttons": {
					"normal": "btn btn-default",
					"disabled": "disabled"
				},
				"collection": {
					"container": "DTTT_dropdown dropdown-menu",
					"buttons": {
						"normal": "",
						"disabled": "disabled"
					}
				},
				"print": {
					"info": "DTTT_print_info"
				},
				"select": {
					"row": "active"
				}
			} );

			// Have the collection use a bootstrap compatible drop down
			$.extend( true, DataTable.TableTools.DEFAULTS.oTags, {
				"collection": {
					"container": "ul",
					"button": "li",
					"liner": "a"
				}
			} );
		}

	}

});
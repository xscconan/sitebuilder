define(['jquery', 'SYLIB/mustache', 'SHARE_JS/libs/utils'], function($, Mustache, SUtils){
	var Panels = {
		ajaxLoadingIcon : '<div class="loadDiv2"></div>',
		closeBtn : '<span pid="{{id}}" class="iconBtn closeBtn"></span>',
		Arrow : {
			tmp : '<div id="{{id}}" class="arrow_box {{direction}} box-shadow"><div class="title"><span pid="{{id}}" class="iconBtn closeBtn"></span></div><div class="container">##content##</div></div>',
			popup : function(uuid, _content, _direction, _x, _y, _width, _height, _hasCloseBtn){
				var _id = uuid || SUtils.UUID();
				_id += '_popupPanel';

				if (!!$("#"+ _id).attr('id'))
					return;

				var _data = {
					id : _id,
					direction : _direction,
					hasCloseBtn : _hasCloseBtn
				};

				var contents = Mustache.render(this.tmp, _data);
				contents = contents.replace('##content##', _content);
				
				$('body').prepend(contents);
				var theArrowJo = $("#" + _id);
				theArrowJo.offset({left: _x, top: _y});
				theArrowJo.width(_width);
				theArrowJo.height(_height);

				theArrowJo.find(".closeBtn").click(function(){
					var pid = $(this).attr('pid');
					$('#' + pid).remove();
				});

				return _id;
			},
			ajaxPopup : function(uuid, _direction, _x, _y, _width, _height, _hasCloseBtn){
				var _content = Panels.ajaxLoadingIcon;
				return this.popup(uuid, _content, _direction, _x, _y, _width, _height, _hasCloseBtn);
			}

		},
		MaskLayour : {
			insert : function(className){
				$('body').prepend('<div class="alphaDarkMask '+className+'"></div>');
			},
			remove : function(){
				$(".alphaDarkMask").fadeOut('1000').remove();
			}
		},
		PopupPanel : {
			insertLoadingPanel : function(_id, _title, closeEventCallBakFun, _noCloseBtn){
				
				var content = '<div>'+Panels.ajaxLoadingIcon+'<br/></div>'
				this.insert(_id, _title, content, closeEventCallBakFun, _noCloseBtn);
			},
			insert : function(_id, _title, _content, closeEventCallBakFun, _noCloseBtn){
				var title = _title || "";
				var content = _content || Panels.ajaxLoadingIcon;
				var closeBtn = (!_noCloseBtn)?Panels.closeBtn:"";

				var panelsTmp = '<div id="{{id}}" class="popupBox box-shadow"><div class="body"><div class="title">{{title}}'+closeBtn+'</div><div class="container">##content##</div></div></div>';
				var contents = Mustache.render(panelsTmp, {id : _id, title: title});
				contents = contents.replace('##content##', content);
				$('body').prepend(contents);

				var thePanelJo =  $("#" + _id);
				thePanelJo.find(".closeBtn").click(function(){
					var pid = $(this).attr('pid');
					Panels.PopupPanel.removePanelById(pid);

					if (!!closeEventCallBakFun)
						closeEventCallBakFun();
				});
			},
			updateContent : function(_parentBoxId, _title, _content, _buttonObj)
			{
				var thisPanelJo = $("#"+ _parentBoxId);
				if (!!_title)
					thisPanelJo.find('.title').html(_title);
				if (!!_content)
					thisPanelJo.find('.container').html(_content);

				if (!!_buttonObj)
					this.btnsEventListen(_buttonObj, _parentBoxId);
			},
			removePanelById : function(id){
				jQuery("#"+ id).fadeOut('1000').remove();
			},
			buttonsPanel : function(buttonObj) {
				if (!buttonObj)
					return;

				var content = "<div class='buttonsPanel'>{{#buttons}}<button id='{{id}}' class='button blue normal' type='button'>{{text}}</button>{{/buttons}}</div>";
				return Mustache.render(content, buttonObj);
			},
			/**btnsEventListen
			*buttonObj:
			* id : button dom id, String
			* text: text in button, String
			* clickEventFun:  event handle after button clicked, Function
			* validation: refer values valdation, Function
			* isAjax: insert ajax loading mask layour, Bool
			* isDirectClose: direct close the popup panel after button clicked, Bool
			**/
			btnsEventListen : function(buttonObj, parentBoxId) {
				if (!buttonObj)
					return;

				var buttons =  buttonObj.buttons;

				for (i in buttons)
				{
					var button =  buttons[i];

					if (!!button.clickEventFun)
					{
						var newBtnJo = $("#" + button.id);
						
						//already exist
						if (!!newBtnJo.data('buttonJo'))
							continue;

						newBtnJo.data('buttonJo', button);
						newBtnJo.click(function(){
							var tmpThisBtn = $(this).data('buttonJo');
							var parentBoxJo = $("#" + parentBoxId);
							if (
									!tmpThisBtn.validation || 
								 	(!!tmpThisBtn.validation && tmpThisBtn.validation())
								  )
							{
								if (!!tmpThisBtn.isAjax)
								{
									var targetJo = parentBoxJo.find(".container");
									var id = tmpThisBtn.id + "_ajaxLoading";
									Panels.AjaxLoadingLayour.insert(targetJo, id);
								}
								else if (!!tmpThisBtn.isDirectClose)
									parentBoxJo.remove();

								tmpThisBtn.clickEventFun(parentBoxId);
							}
		
						});
					}
			
				}
			}
		},
		AjaxLoadingLayour : {
			insert : function(targetJo, id){
				var content = "<div class='ajaxLoadingLayout'>"+Panels.ajaxLoadingIcon+"</div>";
				targetJo.prepend(content);
			}
		}
	};

	return Panels;
});
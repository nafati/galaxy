define(["utils/utils","mvc/ui/ui-table","mvc/ui/ui-misc","mvc/ui/ui-portlet","mvc/form/form-repeat","mvc/form/form-input","mvc/form/form-parameters"],function(a,b,c,d,e,f,g){var h=Backbone.View.extend({initialize:function(a,c){this.app=a,this.inputs=c.inputs,c.cls="ui-table-plain",c.cls_tr="section-row",this.table=new b.View(c),this.parameters=new g(a,c),this.setElement(this.table.$el),this.render()},render:function(){this.table.delAll();for(var a in this.inputs)this.add(this.inputs[a])},add:function(b){var c=jQuery.extend(!0,{},b);c.id=b.id=a.uid(),this.app.input_list[c.id]=c;var d=c.type;switch(d){case"conditional":this._addConditional(c);break;case"repeat":this._addRepeat(c);break;case"section":this._addSection(c);break;default:this._addRow(c)}},_addConditional:function(a){var b=this;a.test_param.id=a.id,this.app.options.sustain_conditionals&&(a.test_param.disabled=!0);var c=this._addRow(a.test_param);c.options.onchange=function(c){var d=b.app.data.matchCase(a,c);for(var e in a.cases){var f=a.cases[e],g=a.id+"-section-"+e,h=b.table.get(g),i=!1;for(var j in f.inputs)if(!f.inputs[j].hidden){i=!0;break}e==d&&i?h.fadeIn("fast"):h.hide()}b.app.trigger("change")};for(var d in a.cases){var e=a.id+"-section-"+d,f=new h(this.app,{inputs:a.cases[d].inputs});f.$el.addClass("ui-table-section"),this.table.add(f.$el),this.table.append(e)}c.trigger("change")},_addRepeat:function(a){function b(b){var e=a.id+"-section-"+d++,f=new h(c.app,{inputs:b});g.add({id:e,$el:f.$el,ondel:function(){g.del(e),c.app.trigger("change")}})}for(var c=this,d=0,g=new e.View({title:a.title,title_new:a.title,min:a.min,max:a.max,onnew:function(){b(a.inputs),c.app.trigger("change")}}),i=a.min,j=_.size(a.cache),k=0;k<Math.max(j,i);k++){var l=null;l=j>k?a.cache[k]:a.inputs,b(l)}this.app.options.sustain_repeats&&g.hideOptions();var m=new f(this.app,{label:a.title,help:a.help,field:g});this.table.add(m.$el),this.table.append(a.id)},_addSection:function(a){var b=this,e=new h(b.app,{inputs:a.inputs}),f=new c.ButtonIcon({icon:"fa-eye-slash",tooltip:"Show/hide section",cls:"ui-button-icon-plain"}),g=new d.View({title:a.title,cls:"ui-portlet-section",collapsible:!0,collapsed:!0,operations:{button_visible:f}});g.append(e.$el),g.append($("<div/>").addClass("ui-table-form-info").html(a.help)),g.setOperation("button_visible",function(){g.collapsed?g.expand():g.collapse()}),g.on("expanded",function(){f.setIcon("fa-eye")}),g.on("collapsed",function(){f.setIcon("fa-eye-slash")}),this.app.on("expand",function(a){g.$("#"+a).length>0&&g.expand()}),a.expanded&&g.expand(),this.table.add(g.$el),this.table.append(a.id)},_addRow:function(a){var b=a.id,c=this.parameters.create(a);this.app.field_list[b]=c;var d=new f(this.app,{name:a.name,label:a.label||a.name,value:a.value,default_value:a.default_value,collapsible:a.collapsible,collapsible_value:a.collapsible_value,help:a.help,argument:a.argument,disabled:a.disabled,field:c});return this.app.element_list[b]=d,this.table.add(d.$el),this.table.append(b),a.hidden&&this.table.get(b).hide(),c}});return{View:h}});
//# sourceMappingURL=../../../maps/mvc/form/form-section.js.map
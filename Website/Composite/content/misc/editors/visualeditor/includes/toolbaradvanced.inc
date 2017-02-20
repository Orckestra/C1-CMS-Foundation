<ui:toolbarbody>
  <ui:toolbargroup>
    <ui:selector id="blockselector" binding="BlockSelectorBinding" observes="broadcasterIsActive" image="${icon:editor-blockselector}" image-disabled="${icon:editor-blockselector-disabled}" width="140" />
    <ui:selector id="formatselector" binding="FormatSelectorBinding" observes="broadcasterIsActive" image="${icon:editor-formatselector}" image-disabled="${icon:editor-formatselector-disabled}" width="140"/>
    <ui:selector id="classnameselector" binding="ClassNameSelectorBinding" observes="broadcasterIsActive" image="${icon:editor-classselector}" image-disabled="${icon:editor-classselector-disabled}" label="${string:Composite.Web.VisualEditor:ClassSelector.LabelNone}" value="" width="140" />
  </ui:toolbargroup>
  <ui:toolbargroup>
    <ui:toolbarbutton label="${string:Composite.Web.VisualEditor:ContextMenu.LabelInsert}" binding="VisualEditorInsertPlusFieldsToolBarButtonBinding" image="${icon:insert}" image-disabled="${icon:insert-disabled}" isdisabled="true" observes="broadcasterIsActive" popup="insertpopup" />
    <ui:toolbarbutton label="${string:Composite.Web.VisualEditor:ContextMenu.LabelPaste}" binding="VisualEditorInsertToolBarButtonBinding" image="${icon:down}" image-disabled="${icon:down-disabled}" isdisabled="true" observes="broadcasterIsActive" popup="pastepopup" />
  </ui:toolbargroup>
  <ui:toolbargroup binding="VisualEditorPropertiesToolBarGroupBinding" hidden="true" observes="broadcasterIsActive">
    <ui:toolbarbutton cmd="compositeInsertImage" val="update" label="${string:Composite.Web.VisualEditor:ContextMenu.LabelImageProperties" image="${icon:image}" />
    <ui:toolbarbutton cmd="compositeInsertRendering" val="update" label="${string:Composite.Web.VisualEditor:ContextMenu.LabelRenderingProperties}" image="${icon:functioncall}" />
  </ui:toolbargroup>
</ui:toolbarbody>

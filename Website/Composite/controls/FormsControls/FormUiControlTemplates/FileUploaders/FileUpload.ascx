<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.FileUploadTemplateUserControlBase" %>

<script runat="server">
    protected override void BindStateToProperties()
    {
        this.UploadedFile.HasFile = fileUpload.HasFile;
        
        if (fileUpload.HasFile == true)
        {
            this.UploadedFile.ContentLength = fileUpload.PostedFile.ContentLength;
            this.UploadedFile.ContentType = fileUpload.PostedFile.ContentType;
            this.UploadedFile.FileName = System.IO.Path.GetFileName(fileUpload.PostedFile.FileName);
            this.UploadedFile.FileStream = fileUpload.PostedFile.InputStream;
        }
    }

    protected override void InitializeViewState()
    {
    }


    public override string GetDataFieldClientName()
    {
        return null;
    }
</script>
<ui:filepicker required="true">
	<ui:datainput class="fake" isdisabled="true" spellcheck="false" />
	<ui:clickbutton image="${icon:popup}" width="30"/>
    <asp:FileUpload runat="server" ID="fileUpload" CssClass="real" onkeydown="return false;"/>
</ui:filepicker>
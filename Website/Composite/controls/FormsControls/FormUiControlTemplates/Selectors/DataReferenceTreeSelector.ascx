<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.DataReferenceTreeSelectorTemplateUserControlBase" %>
<%@ Import Namespace="Composite.Core.Routing" %>
<%@ Import Namespace="Composite.Data" %>
<%@ Import Namespace="Composite.Data.Types" %>
<%@ Import Namespace="Composite.Core.Extensions" %>
<%@ Import Namespace="Composite.Core.ResourceSystem" %>

<script runat="server">
    private bool _loaded;
    private string _value;
    
    protected override void BindStateToProperties()
    {
        LoadPostData();

        Selected = _value == string.Empty ? null : _value;
    }

    private void LoadPostData()
    {
        if(IsPostBack && !_loaded)
        {
            _value = ctlSelectorDialog.Value;
            MediaUrlData mediaUrlData;
            
            if(!_value.IsNullOrEmpty()
                && IsMediaReference()
                && TryExtractMedia(_value, out mediaUrlData))
            {
                Guid mediaId = mediaUrlData.MediaId;
                string storeId = mediaUrlData.MediaStore;

                IMediaFile media = DataFacade.GetData<IMediaFile>(file => file.Id == mediaId && file.StoreId == storeId).FirstOrDefault();
                if (media != null)
                {
                    _value = new DataReference<IMediaFile>(media).ToString();
                }
            }
            
            
            _loaded = true;
        }
    }

    static bool TryExtractMedia(string value, out MediaUrlData mediaUrlData)
    {
        mediaUrlData = MediaUrls.ParseUrl(value);
        
        return mediaUrlData != null;
    }
    
    protected override void InitializeViewState()
    {
        _value = Selected;
        _loaded = true;
    }

    private IDataReference BuildReference(string serializedValue)
    {
        Type dataReferenceType = typeof(DataReference<>).MakeGenericType(new[] { this.DataType });
        object[] activationParameters = new object[1];
        activationParameters[0] = serializedValue;
        return (IDataReference)Activator.CreateInstance(dataReferenceType, activationParameters);
    }
    
    protected override void  OnPreRender(EventArgs e)
    {
        base.OnPreRender(e);

        ctlSelectorDialog.Nullable = this.NullValueAllowed;
        if(NullValueAllowed)
        {
            ctlSelectorDialog.Attributes.Remove("binding");
        }

        LoadPostData();  // Persistance

        ctlSelectorDialog.Attributes["handle"] = this.Handle;
        ctlSelectorDialog.Attributes["providersearch"] = this.SearchToken;

        string label = null;
        bool brokenReference = false;

        bool valueSet = false;
        
        if (!_value.IsNullOrEmpty())
        {
            IDataReference reference = BuildReference(_value);

            valueSet = reference != null && reference.IsSet;
            
            if (valueSet)
            {
                try
                {
                    label = reference.Data.GetLabel(true);
					ctlSelectorDialog.Attributes["selectedtoken"] = Composite.C1Console.Security.EntityTokenSerializer.Serialize(reference.Data.GetDataEntityToken(), true);
                }
                catch (Exception)
                {
                    brokenReference = true;
                    label = StringResourceSystemFacade.GetString("Composite.Management", "AspNetUiControl.Selector.BrokenReference");
                }
            }
        }

        if (!this.NullValueAllowed && !valueSet)
        {
            ctlSelectorDialog.Attributes["required"] = "true";
        }        

        if (label == null)
        {
            ctlSelectorDialog.Attributes["label"] = StringResourceSystemFacade.GetString("Composite.Management", "AspNetUiControl.Selector.NoSelection");
            ctlSelectorDialog.Attributes["tooltip"] = "";
            return;
        }

        if (!brokenReference && IsMediaReference())
        {
            int fileNameIndex = label.LastIndexOf('/');
            if(fileNameIndex > 0 && label.Length > fileNameIndex + 1) 
            {
                label = label.Substring(fileNameIndex + 1);
            }
        }
        
        ctlSelectorDialog.Attributes["label"] = label;
        ctlSelectorDialog.Value = _value ?? string.Empty;
    }
    
    private bool IsMediaReference()
    {
        return DataType == typeof (IImageFile) || DataType == typeof (IMediaFile);
    }

    public override string GetDataFieldClientName()
    {
        return ctlSelectorDialog.UniqueID;
    }
</script>

<aspui:PostBackDialog 
    runat="server"
    EnableViewState="false"
	ID="ctlSelectorDialog"  
	value=""
    binding="ViewDefinitionPostBackDataDialogBinding" />




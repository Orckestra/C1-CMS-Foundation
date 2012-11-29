<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.DataReferenceTreeSelectorTemplateUserControlBase" %>
<%@ Import Namespace="Composite.Data" %>
<%@ Import Namespace="Composite.Data.Types" %>
<%@ Import Namespace="Composite.Core.Logging" %>
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
            Guid mediaId;
            
            if(!_value.IsNullOrEmpty()
                && IsMediaReference() 
                && TryExtractMediaId(_value, out mediaId))
            {
                IMediaFile media = DataFacade.GetData<IMediaFile>(file => file.Id == mediaId).FirstOrDefault();
                if (media != null)
                {
                    _value = new DataReference<IMediaFile>(media).ToString();
                }
            }
            
            
            _loaded = true;
        }
    }
    
    static bool TryExtractMediaId(string value, out Guid mediaId)
    {
        if(value.Contains("="))
        {
            return Guid.TryParse(value.Substring(value.LastIndexOf("=") + 1), out mediaId);
        }
        
        if(value.StartsWith("~/media(") && value.EndsWith(")"))
        {
            int openingBracketOffset = value.IndexOf("(");
            int closingBracketOffset = value.IndexOf(")");
            string guidStr = value.Substring(openingBracketOffset + 1, closingBracketOffset - openingBracketOffset - 1);
            return Guid.TryParse(guidStr, out mediaId);
        }
        mediaId = Guid.Empty;
        return false;
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
        
        if (!_value.IsNullOrEmpty())
        {
            IDataReference reference = BuildReference(_value);

            if (reference != null && reference.IsSet)
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

        if (label == null)
        {
            ctlSelectorDialog.Attributes["label"] = StringResourceSystemFacade.GetString("Composite.Management", "AspNetUiControl.Selector.NoSelection");
            ctlSelectorDialog.Attributes["tooltip"] = "";
            return;
        }

        if (!brokenReference && IsMediaReference())
        {
            int fileNameIndex = label.LastIndexOf("/");
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
        return DataType.Equals(typeof (IImageFile)) || DataType.Equals(typeof (IMediaFile));
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




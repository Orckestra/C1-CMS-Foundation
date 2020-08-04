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
        Type dataReferenceType = DataType == typeof(IPage) ? typeof(PageDataReference)
            : typeof(DataReference<>).MakeGenericType(new[] { this.DataType });
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

    /// <summary>
    /// Represents a reference to a C1 CMS IPage item.
    /// </summary>
    [DataReferenceConverter]
    public class PageDataReference : IDataReference
    {
        private IPage _cachedValue;
        private readonly Guid _pageId;

        /// <summary>
        /// Constructs a DataReference using a key value.
        /// </summary>
        /// <param name="keyValue">The key value, like the Guid for a page's Id.</param>
        public PageDataReference(string keyValue)
        {
            if(Guid.TryParse(keyValue, out Guid pageId))
            {
                _pageId = pageId;
            }
        }

        public string Serialize()
        {
            if (_pageId == Guid.Empty) return "";

            return _pageId.ToString();
        }

        public Type ReferencedType => typeof(IPage);



        public bool IsSet => _pageId != Guid.Empty;

        public object KeyValue => _pageId;

        public IData Data
        {
            get
            {
                if (!IsSet)
                {
                    return default(IPage);
                }

                if (_cachedValue != null)
                {
                    return _cachedValue;
                }

                using (var connection = new DataConnection())
                {
                    return _cachedValue = connection.SitemapNavigator.GetPageNodeById(_pageId)?.Page;
                }
                
            }
        }
    }

</script>

<aspui:PostBackDialog 
    runat="server"
    EnableViewState="false"
	ID="ctlSelectorDialog"  
	value=""
    binding="ViewDefinitionPostBackDataDialogBinding" />




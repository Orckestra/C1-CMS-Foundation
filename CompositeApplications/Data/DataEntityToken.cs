using System;
using System.Reflection;
using System.Text;
using Composite.Security;
using Composite.Types;


namespace Composite.Data
{
    [SecurityAncestorProvider(typeof(DataSecurityAncestorProvider))]
    public sealed class DataEntityToken : EntityToken
    {
        private IData _data;
        private bool _dataInitialized;
        private string _serializedDataSourceId;
        private string _serializedDataId = null;
        private string _serializedInterfaceType = null;
        private Type _interfaceType = null;
        private DataSourceId _dataSourceId = null;


        internal DataEntityToken(IData data)
        {
            Verify.ArgumentNotNull(data, "data");

            _data = data;
            _dataInitialized = true;            
            _serializedDataSourceId = null;
            _dataSourceId = _data.DataSourceId;
            _interfaceType = _dataSourceId.InterfaceType;
        }



        private DataEntityToken(string serializedDataSourceId)
        {
            _data = null;
            _dataInitialized = false;
            _serializedDataSourceId = serializedDataSourceId;
            _dataSourceId = null;
        }



        public override string Type
        {
            get
            {
                if (_serializedInterfaceType == null)
                {
                    _serializedInterfaceType = TypeManager.SerializeType(this.DataSourceId.InterfaceType);
                }

                return _serializedInterfaceType;
            }
        }



        public override string Source
        {
            get
            {              
                return this.DataSourceId.ProviderName;
            }
        }



        public override string Id
        {
            get { return this.SerializedDataId; }
        }



        public override bool IsValid()
        {
            return this.Data != null;
        }



        public Type InterfaceType
        {
            get
            {
                if (_interfaceType == null)
                {
                    if (_dataSourceId != null)
                    {
                        _interfaceType = _dataSourceId.InterfaceType;
                    }
                    else
                    {
                        _interfaceType = TypeManager.TryGetType(this.Type);
                    }
                }

                return _interfaceType;
            }
        }



        public DataSourceId DataSourceId
        {
            get
            {
                if (_dataSourceId == null)
                {
                    _dataSourceId = DataSourceId.Deserialize(_serializedDataSourceId);
                }

                return _dataSourceId;
            }
        }



        public override string Serialize()
        {
            return this.SerializedDataSourceId;
        }



        public static EntityToken Deserialize(string serializedData)
        {
            return new DataEntityToken(serializedData);
        }



        public IData Data
        {
            get
            {
                if (_dataInitialized == false)
                {
                    try
                    {
                        DataSourceId dataSourceId = DataSourceId.Deserialize(this.SerializedDataSourceId);

                        _data = DataFacade.GetDataFromDataSourceId(dataSourceId);
                    }
                    catch (Exception)
                    {
                        // Ignore exception - invalid data source id == no data
                    }
                    finally
                    {
                        _dataInitialized = true;
                    }
                }

                return _data;
            }
        }



        public override void OnGetPrettyHtml(EntityTokenHtmlPrettyfier prettyfier)
        {
            prettyfier.OnWriteId = (token, helper) =>
            {
                IDataId dataId = DataIdSerializer.Deserialize(this.Id);

                StringBuilder sb = new StringBuilder();
                sb.Append("<b>DataId</b><br />");
                sb.Append("<b>Type:</b> " + dataId.GetType() + "<br />");
                foreach (PropertyInfo propertyInfo in dataId.GetType().GetPropertiesRecursively())
                {
                    sb.Append("<b>" + propertyInfo.Name + ":</b> " + propertyInfo.GetValue(dataId, null).ToString() + "<br />");
                }

                helper.AddFullRow(new string[] { "<b>Id</b>", sb.ToString() });
            };
        }



        private string SerializedDataSourceId
        {
            get
            {
                if (_serializedDataSourceId == null)
                {
                    _serializedDataSourceId = this.Data.DataSourceId.Serialize();
                }

                return _serializedDataSourceId;
            }
        }



        private string SerializedDataId
        {
            get
            {
                if (_serializedDataId == null)
                {
                    _serializedDataId = this.DataSourceId.DataId.Serialize();
                }

                return _serializedDataId;
            }
        }



        private void CheckValidity()
        {
            Verify.That(IsValid(), "Failed to deserialize data from serialized data source identifier. Probably the data has been removed from data source.");
        }
    }
}

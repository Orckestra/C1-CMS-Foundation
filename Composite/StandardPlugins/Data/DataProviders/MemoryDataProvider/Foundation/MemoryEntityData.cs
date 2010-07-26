using System;
using Composite.Data;
using System.Collections.Generic;
using Composite.Data.Plugins.DataProvider.CodeGeneration;
using Composite.Data.Plugins.DataProvider;
using Composite.Types;
using Composite.Data.ProcessControlled;


namespace Composite.StandardPlugins.Data.DataProviders.MemoryDataProvider.Foundation
{
    internal sealed class MemoryEntityData
    {
        private Type _interfaceType = null;
        private PropertyList _propertyList = null;

        public Type InterfaceType 
        { 
            get 
            {
                if (_interfaceType == null)
                {
                    _interfaceType = TypeManager.GetType(this.InterfaceTypeName);
                }

                return _interfaceType;
            }
            set
            {
                _interfaceType = value;
            }
        }

        public string InterfaceTypeName { get; set; }
        public bool IsGenerated { get; set; }

        //public bool IsVersioned
        //{
        //    get
        //    {
        //        return typeof(IVersionControlled).IsAssignableFrom(this.InterfaceType);
        //    }
        //}

        public PropertyList PropertyList 
        {
            get
            {
                if (_propertyList == null)
                {
                    _propertyList = new PropertyList(this.InterfaceType, this.DataIdProperties, new Dictionary<string,string>());
                }

                return _propertyList;
            }
            set
            {
                _propertyList = value;
            }
        }

        public string KeyClassName { get; set; }
        public string WrapperClassName { get; set; }
        public string EntityClassName { get; set; }
        public string DataIdClassName { get; set; }

        public List<string> DataScopes { get; set; }

        public Dictionary<string, Type> DataIdProperties { get; set; }

        
        internal Type KeyClassType { get; set; }
        internal Type WrapperClassType { get; set; }
        internal Type EntityClassType { get; set; }
        internal Type DataIdClassType { get; set; }

        internal IMemoryEntityKey CreateKey(IData data)
        {
            Type type = this.KeyClassType;
            return (IMemoryEntityKey)Activator.CreateInstance(type, new object[] { data });
        }


        internal IMemoryEntityKey CreateKey(IDataId dataId)
        {
            Type type = this.KeyClassType;
            return (IMemoryEntityKey)Activator.CreateInstance(type, new object[] { dataId });
        }


        internal IEntityWrapper CreateWrapper(IData data, DataProviderContext dataProviderContext)
        {
            return (IEntityWrapper)Activator.CreateInstance(this.WrapperClassType, new object[] { data, dataProviderContext });
        }
    }
}

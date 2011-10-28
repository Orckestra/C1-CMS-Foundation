using System;
using System.Collections.Generic;
using Composite.Core.IO;
using Composite.Core.Types;
using Composite.Core.Types.Plugins.TypeManagerTypeHandler;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Plugins.Types.TypeManagerTypeHandler.DynamicBuildManagerTypeManagerTypeHandler
{    
#warning MRJ: BM: Do we even need this plugin? Should it not be a part of the core?
    [ConfigurationElementType(typeof(DynamicBuildManagerTypeManagerTypeHandlerData))]
    internal sealed class DynamicBuildManagerTypeManagerTypeHandler : ITypeManagerTypeHandler
    {
        private static readonly string _prefix = "DynamicType:";

        private static object _lock = new object();
        private static Dictionary<Type, string> _serializedCache = new Dictionary<Type, string>();

        public Type GetType(string fullName)
        {
            if (fullName.StartsWith(_prefix) && !fullName.Contains(","))
            {
#warning MRJ: BM: Hack!!
                string name = fullName.Remove(0, _prefix.Length);
                Type resultType = Type.GetType(name + ", Composite.Generated");

                return resultType;
                //if (GlobalInitializerFacade.DynamicTypesGenerated == false) throw new InvalidOperationException(string.Format("The type {0} could not be found. The dynamic data system is not initialized yet!", fullName));
                                
                
                //return BuildManager.GetType(name);
            }
            else
            {
                return null;
            }
        }


        
        public string SerializeType(Type type)
        {
            lock (_lock)
            {
                string result = null;

                if (_serializedCache.TryGetValue(type, out result) == false)
                {
                    result = SerializeTypeImpl(type);
                    _serializedCache.Add(type, result);
                }

                return result;
            }
        }



        public bool HasTypeWithName(string typeFullname)
        {
            if (typeFullname.StartsWith(_prefix) == false) return false;

            string name = typeFullname.Remove(0, _prefix.Length);

            return BuildManager.GetType(name) != null;
        }



        private string SerializeTypeImpl(Type type)
        {
            if (type.Assembly.Location.StartsWith(PathUtil.BaseDirectory, StringComparison.InvariantCultureIgnoreCase))
            {
                return type.FullName;    
            }
                
            return null;

#warning MRJ: BM: Fix this!!)
            if (BuildManager.HasType(type) == true)
            {
                return string.Format("{0}{1}", _prefix, type.FullName);
            }
            else
            {
                return null;
            }
        }
    }



    [Assembler(typeof(NonConfigurableTypeManagerTypeHandlerAssembler))]
    internal sealed class DynamicBuildManagerTypeManagerTypeHandlerData : TypeManagerTypeHandlerData
    {        
    }
}

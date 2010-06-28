using System;
using System.Linq;
using System.Reflection;
using System.Web.Compilation;
using Composite.Types.Plugins.TypeManagerTypeHandler;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.StandardPlugins.Types.TypeManagerTypeHandler.AspNetBuildManagerTypeManagerTypeHandler
{    
    [ConfigurationElementType(typeof(AspNetBuildManagerTypeManagerTypeHandlerData))]
    internal sealed class AspNetBuildManagerTypeManagerTypeHandler : ITypeManagerTypeHandler
    {
        private const string _typeNamePrefix = "AspNetType:";

        public Type GetType(string fullName)
        {
            if (fullName.StartsWith(_typeNamePrefix) == true)
            {
                string name = fullName.Remove(0, _typeNamePrefix.Length);

                return BuildManager.GetType(name, false, true);
            }
            else
            {
                return BuildManager.GetType(fullName, false, true);
            }
            
        }


        public string SerializeType(Type type)
        {
            if (BuildManager.CodeAssemblies != null)
            {
                foreach (object obj in BuildManager.CodeAssemblies)
                {
                    Assembly assembly = obj as Assembly;

                    if (assembly != null)
                    {
                        if (assembly.GetTypes().Contains(type) == true)
                        {
                            return string.Format("{0}{1}", _typeNamePrefix, type.FullName);
                        }
                    }
                }
            }
            
            return null;
        }



        public bool HasTypeWithName(string typeFullname)
        {
            return BuildManager.GetType(typeFullname, false, true) != null;
        }
    }

    [Assembler(typeof(NonConfigurableTypeManagerTypeHandlerAssembler))]
    internal sealed class AspNetBuildManagerTypeManagerTypeHandlerData : TypeManagerTypeHandlerData
    {
    }
}

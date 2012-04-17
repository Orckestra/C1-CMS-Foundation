using System;
using System.Linq;
using System.Reflection;
using System.Web.Compilation;
using Composite.Core.Types.Plugins.TypeManagerTypeHandler;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using System.Web.Hosting;


namespace Composite.Plugins.Types.TypeManagerTypeHandler.AspNetBuildManagerTypeManagerTypeHandler
{    
    [ConfigurationElementType(typeof(AspNetBuildManagerTypeManagerTypeHandlerData))]
    internal sealed class AspNetBuildManagerTypeManagerTypeHandler : ITypeManagerTypeHandler
    {
        private const string _typeNamePrefix = "AspNetType:";

        public Type GetType(string fullName)
        {
            if (!HostingEnvironment.IsHosted) return null;

            string name = fullName;

            if (name.StartsWith(_typeNamePrefix) == true)
            {
                name = name.Remove(0, _typeNamePrefix.Length);
            }

            if(name.Contains(":"))
            {
                return null;
            }

            return BuildManager.GetType(name, false, true);
        }


        public string SerializeType(Type type)
        {
            if (!HostingEnvironment.IsHosted) return null;

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
            if (!HostingEnvironment.IsHosted) return false;

            return BuildManager.GetType(typeFullname, false, true) != null;
        }
    }

    [Assembler(typeof(NonConfigurableTypeManagerTypeHandlerAssembler))]
    internal sealed class AspNetBuildManagerTypeManagerTypeHandlerData : TypeManagerTypeHandlerData
    {
    }
}

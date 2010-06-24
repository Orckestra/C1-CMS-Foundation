using System;
using Composite.Types.Plugins.TypeManagerTypeHandler.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Types.Plugins.TypeManagerTypeHandler
{
    [CustomFactory(typeof(TypeManagerTypeHandlerCustomFactory))]
    [ConfigurationNameMapper(typeof(TypeManagerTypeHandlerDefaultNameRetriever))]
    public interface ITypeManagerTypeHandler
    {        
        Type GetType(string serializedType);
        string SerializeType(Type type);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="typeFullname">Full name: namespace+name. X.Y.Z where X.Y is the namespace and Z is the type.</param>
        /// <returns></returns>
        bool HasTypeWithName(string typeFullname);
    }
}

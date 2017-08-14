using System;
using System.Linq;
using System.Threading;
using Composite.C1Console.Security;
using Composite.Core.Extensions;
using Newtonsoft.Json;


namespace Composite.Plugins.Elements.ElementProviders.BaseFunctionProviderElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SecurityAncestorProvider(typeof(BaseFunctionFolderElementEntityTokenSecurityAncestorProvider))]
	public sealed class BaseFunctionFolderElementEntityToken : EntityToken
	{
        private readonly string _id;
        private string _elementProviderName;
        private string _functionNamespace;

        /// <exclude />
        public BaseFunctionFolderElementEntityToken(string elementProviderName, string functionNamespace)
        {
            Verify.ArgumentCondition(!elementProviderName.Contains('.'), "elementProviderName", "Function element provider name can't contain '.' symbol in its name");

            if (functionNamespace == "")
            {
                _id = "ROOT:" + elementProviderName;
            }
            else
            {
                _id = "ROOT:{0}.{1}".FormatWith(elementProviderName, functionNamespace);
            }
        }

        /// <exclude />
        public BaseFunctionFolderElementEntityToken(string id)
        {
            _id = id;
        }

        /// <exclude />
        public override string Type
        {
            get { return ""; }
        }

        /// <exclude />
        public override string Source
        {
            get { return ""; }
        }

        /// <exclude />
        public override string Id
        {
            get { return _id; }
        }

        /// <exclude />
        public override string Serialize()
        {
            return DoSerialize();
        }

        /// <summary>
        /// Gets the function namespace.
        /// </summary>
        [JsonIgnore]
        public string FunctionNamespace
        {
            get
            {
                ParseId();
                return _functionNamespace;
            }
        }

        /// <summary>
        /// Gets the name of the function provider.
        /// </summary>
        /// <value>
        /// The name of the function provider.
        /// </value>
        [JsonIgnore]
        public string ElementProviderName
        {
            get
            {
                ParseId();
                return _elementProviderName;
            }
        }

        private void ParseId()
        {
            if(_elementProviderName != null) return;

            const string prefix = "ROOT:";

            Verify.That(_id.StartsWith(prefix), "Id should start with prefix '{0}'", prefix);

            string providerAndNamespace = _id.Substring(prefix.Length);
            int pointOffset = providerAndNamespace.IndexOf('.');

            if(pointOffset == -1)
            {
                _functionNamespace = null;
                Thread.MemoryBarrier();
                _elementProviderName = providerAndNamespace;
            }
            else
            {
                _functionNamespace = providerAndNamespace.Substring(pointOffset + 1);
                Thread.MemoryBarrier();
                _elementProviderName = providerAndNamespace.Substring(0, pointOffset);
            }
        }

        /// <exclude />
        public static EntityToken Deserialize(string serializedData)
        {
            string type, source, id;

            EntityToken.DoDeserialize(serializedData, out type, out source, out id);

            return new BaseFunctionFolderElementEntityToken(id);
        }
    }
}

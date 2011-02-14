using System;
using System.Linq;
using System.Text;
using System.Collections.Generic;

using Composite.C1Console.Security;


namespace Composite.Plugins.Elements.ElementProviders.BaseFunctionProviderElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SecurityAncestorProvider(typeof(BaseFunctionFolderElementEntityTokenSecurityAncestorProvider))]
	public sealed class BaseFunctionFolderElementEntityToken : EntityToken
	{
        private string _id;

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

        /// <exclude />
        public static EntityToken Deserialize(string serializedData)
        {
            string type, source, id;

            EntityToken.DoDeserialize(serializedData, out type, out source, out id);

            return new BaseFunctionFolderElementEntityToken(id);
        }
    }
}

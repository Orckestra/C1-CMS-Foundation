using System;
using System.Linq;
using System.Text;
using System.Collections.Generic;

using Composite.Security;


namespace Composite.StandardPlugins.Elements.ElementProviders.BaseFunctionProviderElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SecurityAncestorProvider(typeof(BaseFunctionFolderElementEntityTokenSecurityAncestorProvider))]
	public sealed class BaseFunctionFolderElementEntityToken : EntityToken
	{
        private string _id;

        public BaseFunctionFolderElementEntityToken(string id)
        {
            _id = id;
        }

        public override string Type
        {
            get { return ""; }
        }

        public override string Source
        {
            get { return ""; }
        }

        public override string Id
        {
            get { return _id; }
        }

        public override string Serialize()
        {
            return DoSerialize();
        }

        public static EntityToken Deserialize(string serializedData)
        {
            string type, source, id;

            EntityToken.DoDeserialize(serializedData, out type, out source, out id);

            return new BaseFunctionFolderElementEntityToken(id);
        }
    }
}

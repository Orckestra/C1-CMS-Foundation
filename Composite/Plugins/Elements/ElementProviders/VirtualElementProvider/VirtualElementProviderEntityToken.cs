using System;
using Composite.C1Console.Security;
using Composite.Core.Types;


namespace Composite.Plugins.Elements.ElementProviders.VirtualElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SecurityAncestorProvider(typeof(VirtualElementProviderSecurityAncestorProvider))]
    public sealed class VirtualElementProviderEntityToken : EntityToken
    {
        private string _source;
        private string _id;
        private string _type;


        /// <exclude />
        public VirtualElementProviderEntityToken()
        {
            _type = TypeManager.SerializeType(this.GetType());
        }


        /// <exclude />
        public VirtualElementProviderEntityToken(string source, string id)
            :this()
        {
            _source = source;
            _id = id;            
        }


        /// <exclude />
        public override string Type
        {
            get { return _type; }
        }


        /// <exclude />
        public override string Source
        {
            get { return _source; }
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
        public static EntityToken Deserialize(string serializedEntityToken)
        {
            string type, source, id;

            EntityToken.DoDeserialize(serializedEntityToken, out type, out source, out id);

            return new VirtualElementProviderEntityToken(source, id);
        }
    }
}

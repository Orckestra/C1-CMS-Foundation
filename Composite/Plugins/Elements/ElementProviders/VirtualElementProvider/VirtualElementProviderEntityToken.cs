using System;
using Composite.C1Console.Security;
using Composite.Core;
using Composite.Core.Serialization;
using Composite.Core.Types;
using Newtonsoft.Json;


namespace Composite.Plugins.Elements.ElementProviders.VirtualElementProvider
{
    /// <summary>
    /// EntityTokon of elements created by <see cref="VirtualElementProvider"/>
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SecurityAncestorProvider(typeof(VirtualElementProviderSecurityAncestorProvider))]
    public sealed class VirtualElementProviderEntityToken : EntityToken
    {
        private string _type;

        /// <exclude />
        public VirtualElementProviderEntityToken()
        {
        }


        /// <exclude />
        [JsonConstructor]
        public VirtualElementProviderEntityToken(string source, string id)
        {
            Source = source;
            Id = id;            
        }


        /// <exclude />
        [JsonIgnore]
        public override string Type
        {
            get
            {
                if (_type == null)
                {
                    _type= TypeManager.SerializeType(this.GetType());
                }

                return _type;
            }
        }


        /// <exclude />
        public override string Source { get; }


        /// <exclude />
        public override string Id { get; }


        /// <exclude />
        public override string Serialize()
        {
            return CompositeJsonSerializer.Serialize(this);
        }

        /// <exclude />
        public static EntityToken Deserialize(string serializedEntityToken)
        {
            EntityToken entityToken;
            if (CompositeJsonSerializer.IsJsonSerialized(serializedEntityToken))
            {
                entityToken =
                    CompositeJsonSerializer.Deserialize<VirtualElementProviderEntityToken>(serializedEntityToken);
            }
            else
            {
                entityToken = DeserializeLegacy(serializedEntityToken);
                Log.LogVerbose(nameof(VirtualElementProviderEntityToken), entityToken.GetType().FullName);
            }
            return entityToken;
        }

        /// <exclude />
        public static EntityToken DeserializeLegacy(string serializedEntityToken)
        {
            string type, source, id;

            EntityToken.DoDeserialize(serializedEntityToken, out type, out source, out id);

            return new VirtualElementProviderEntityToken(source, id);
        }
    }
}

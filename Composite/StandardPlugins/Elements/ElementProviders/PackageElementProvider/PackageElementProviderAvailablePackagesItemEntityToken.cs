using System;
using System.Collections.Generic;
using System.Text;
using Composite.C1Console.Security;
using Composite.Core.Serialization;


namespace Composite.Plugins.Elements.ElementProviders.PackageElementProvider
{
    internal sealed class AddOnElementProviderAvailableAddOnsItemEntityTokenAncestorProvider : ISecurityAncestorProvider
    {
        public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            if (entityToken == null) throw new ArgumentNullException("entityToken");

            yield return new PackageElementProviderRootEntityToken();
        }
    }




    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SecurityAncestorProvider(typeof(AddOnElementProviderAvailableAddOnsItemEntityTokenAncestorProvider))]
    public sealed class PackageElementProviderAvailablePackagesItemEntityToken : EntityToken
    {
        private string _id;

        public PackageElementProviderAvailablePackagesItemEntityToken(string id, string groupName)
        {
            _id = id;
            this.GroupName = groupName;
        }

        public string GroupName { get; private set; }
        public Guid AddOnId { get { return new Guid(this.Id); } }

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
            StringBuilder sb = new StringBuilder();

            StringConversionServices.SerializeKeyValuePair(sb, "_GroupName_", this.GroupName);

            DoSerialize(sb);

            return sb.ToString();
        }

        public static EntityToken Deserialize(string serializedEntityToken)
        {
            string type, source, id;
            Dictionary<string, string> dic;

            DoDeserialize(serializedEntityToken, out type, out source, out id, out dic);

            if (dic.ContainsKey("_GroupName_") == false) throw new ArgumentException("serializedEntityToken is of wrong format");

            string groupName = StringConversionServices.DeserializeValueString(dic["_GroupName_"]);

            return new PackageElementProviderAvailablePackagesItemEntityToken(id, groupName);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Text;
using Composite.C1Console.Security;
using Composite.Core.Serialization;

namespace Composite.C1Console.Actions.Data
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [ActionExecutor(typeof(ProxyDataActionExecuter))]
    public class ProxyDataActionToken : ActionToken 
    {
        private readonly ActionIdentifier _actionIdentifier;
        private readonly IEnumerable<PermissionType> _permissionTypes;
        /// <exclude />
        public ProxyDataActionToken( ActionIdentifier actionIdentifier)
        {
            _actionIdentifier = actionIdentifier;
        }
        /// <exclude />
        public ProxyDataActionToken(ActionIdentifier actionIdentifier, IEnumerable<PermissionType> permissionTypes) : this(actionIdentifier)
        {
            _permissionTypes = permissionTypes;
        }
        /// <exclude />
        public ActionIdentifier ActionIdentifier => _actionIdentifier;

        /// <exclude />
        public bool DoIgnoreEntityTokenLocking { get; set;}

        /// <exclude />
        public override bool IgnoreEntityTokenLocking => DoIgnoreEntityTokenLocking;

        /// <exclude />
        public override IEnumerable<PermissionType> PermissionTypes => _permissionTypes ?? _actionIdentifier.Permissions();

        /// <exclude />
        public override string Serialize()
        {
            StringBuilder stringBuilder = new StringBuilder();

            StringConversionServices.SerializeKeyValuePair(stringBuilder, "_ActionIdentifier_", ActionIdentifier.Serialize());
            StringConversionServices.SerializeKeyValuePair(stringBuilder, "_PermissionTypes_", PermissionTypes.SerializePermissionTypes());
            StringConversionServices.SerializeKeyValuePair(stringBuilder, "_DoIgnoreEntityTokenLocking_", DoIgnoreEntityTokenLocking);

            return stringBuilder.ToString();
        }
        /// <exclude />
        public static ActionToken Deserialize(string serializedData)
        {
            Dictionary<string, string> dic = StringConversionServices.ParseKeyValueCollection(serializedData);

            if (!dic.ContainsKey("_ActionIdentifier_") || !dic.ContainsKey("_PermissionTypes_") )
            {
                throw new ArgumentException($"The {nameof(serializedData)} is not a serialized {nameof(ProxyDataActionToken)}", nameof(serializedData));
            }

            string serializedType = StringConversionServices.DeserializeValueString(dic["_ActionIdentifier_"]);
            
            string permissionTypesString = StringConversionServices.DeserializeValueString(dic["_PermissionTypes_"]);

            bool doIgnoreEntityTokenLocking = StringConversionServices.DeserializeValueBool(dic["_DoIgnoreEntityTokenLocking_"]);

            var result = new ProxyDataActionToken(ActionIdentifier.Deserialize(serializedType), permissionTypesString.DesrializePermissionTypes()) {DoIgnoreEntityTokenLocking = doIgnoreEntityTokenLocking};

            return result;
        }
    }
}
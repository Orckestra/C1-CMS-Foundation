using System;
using System.Collections.Generic;
using System.Text;
using Composite.C1Console.Actions;
using Composite.C1Console.Actions.Data;
using Composite.C1Console.Security;
using Composite.Core.Serialization;

namespace Composite.Plugins.Elements.ElementProviders.PageElementProvider
{
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [ActionExecutor(typeof(PageAddActionExecuter))]
    class PageAddActionToken : ProxyDataActionToken
    {
        private readonly Guid _pageTypeId;
        /// <exclude />
        public PageAddActionToken(Guid pageTypeId, ActionIdentifier actionIdentifier) : base(actionIdentifier)
        {
            _pageTypeId = pageTypeId;
        }
        /// <exclude />
        public PageAddActionToken(Guid pageTypeId, ActionIdentifier actionIdentifier, IEnumerable<PermissionType> permissionTypes) : base(actionIdentifier,permissionTypes)
        {
            _pageTypeId = pageTypeId;
        }
        /// <exclude />
        public Guid PageTypeId => _pageTypeId;

        public override string Serialize()
        {
            StringBuilder stringBuilder = new StringBuilder(base.Serialize());

            StringConversionServices.SerializeKeyValuePair(stringBuilder, "_PageTypeId_", _pageTypeId);
            
            return stringBuilder.ToString();
        }
        /// <exclude />
        public new static ActionToken Deserialize(string serializedData)
        {
            Dictionary<string, string> dic = StringConversionServices.ParseKeyValueCollection(serializedData);

            Guid pageTypeId = StringConversionServices.DeserializeValueGuid(dic["_PageTypeId_"]);

            var baseProxyDataActionToken = (ProxyDataActionToken)ProxyDataActionToken.Deserialize(serializedData);

            var result = new PageAddActionToken(pageTypeId, baseProxyDataActionToken.ActionIdentifier, baseProxyDataActionToken.PermissionTypes) { DoIgnoreEntityTokenLocking = baseProxyDataActionToken.IgnoreEntityTokenLocking };

            return result;
        }
    }
}



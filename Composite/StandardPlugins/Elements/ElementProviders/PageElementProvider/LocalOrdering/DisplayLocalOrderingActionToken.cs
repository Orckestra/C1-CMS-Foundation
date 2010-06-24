using System;
using System.Collections.Generic;
using Composite.Actions;
using Composite.Security;


namespace Composite.StandardPlugins.Elements.ElementProviders.PageElementProvider.LocalOrdering
{
    [IgnoreEntityTokenLocking()]
    [ActionExecutor(typeof(DisplayLocalOrderingActionExecutor))]
    internal sealed class DisplayLocalOrderingActionToken : ActionToken
	{
        private static PermissionType[] _permissionTypes = new PermissionType[] { PermissionType.Administrate };


        public DisplayLocalOrderingActionToken(Guid parentPageId)
        {
            this.ParentPageId = parentPageId;
        }


        public Guid ParentPageId
        {
            get;
            private set;
        }


        public override IEnumerable<PermissionType> PermissionTypes
        {
            get { return _permissionTypes; }
        }


        public override string Serialize()
        {
            return this.ParentPageId.ToString();
        }


        public static ActionToken Deserialize(string serializedData)
        {
            Guid parentPageId = new Guid(serializedData);

            return new DisplayLocalOrderingActionToken(parentPageId);
        }
	}
}

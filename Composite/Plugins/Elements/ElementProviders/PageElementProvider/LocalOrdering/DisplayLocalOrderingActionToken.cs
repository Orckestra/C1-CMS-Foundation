using System;
using System.Collections.Generic;
using Composite.C1Console.Actions;
using Composite.C1Console.Security;


namespace Composite.Plugins.Elements.ElementProviders.PageElementProvider.LocalOrdering
{
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

        public override bool IgnoreEntityTokenLocking => true;

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

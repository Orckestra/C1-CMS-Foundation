using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.C1Console.Security;
using Composite.C1Console.Security.SecurityAncestorProviders;


namespace Composite.Plugins.Elements.ElementProviders.UserGroupElementProvider
{
    [SecurityAncestorProvider(typeof(NoAncestorSecurityAncestorProvider))]
    internal sealed class UserGroupElementProviderRootEntityToken : EntityToken
	{
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
            get { return "UserGroupElementProviderRootEntityToken"; }
        }

        public override string Serialize()
        {
            return DoSerialize();
        }

        public static EntityToken Deserialize(string serializedEntityToken)
        {
            return new UserGroupElementProviderRootEntityToken();
        }
	}
}

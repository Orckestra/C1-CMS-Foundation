using System.Collections.Generic;
using System;
using Composite.Core.Types;
using System.Linq;


namespace Composite.C1Console.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class ActionToken
    {
        /// <exclude />
        public abstract IEnumerable<PermissionType> PermissionTypes { get; }

        /// <exclude />
        public virtual string Serialize() { return ""; }

        /// <exclude />
        public virtual bool IgnoreEntityTokenLocking { get { return false; } }
    }



    internal static class ActionTokenExtensionMethods
    {
        public static bool IsIgnoreEntityTokenLocking(this ActionToken actionToken)
        {
            if (actionToken == null) throw new ArgumentNullException(nameof(actionToken));
            
            return actionToken.IgnoreEntityTokenLocking;
        }
    }
}

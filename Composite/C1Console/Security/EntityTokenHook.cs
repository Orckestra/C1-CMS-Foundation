using System.Linq;
using System.Collections.Generic;
using System.Diagnostics;
using Composite.Core.Linq;


namespace Composite.C1Console.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [DebuggerDisplay("Hooker = {Hooker}")]
	public sealed class EntityTokenHook
	{
        private List<EntityToken> _hooks = new List<EntityToken>();

        public EntityTokenHook(EntityToken hooker)
        {
            Verify.ArgumentNotNull(hooker, "hooker");

            this.Hooker = hooker;
        }



        public EntityToken Hooker
        {
            get;
            private set;
        }



        public IEnumerable<EntityToken> Hookies
        {
            get
            {
                return _hooks;
            }
        }



        public void AddHookie(EntityToken hook)
        {
            Verify.ArgumentNotNull(hook, "hook");

            _hooks.Add(hook);
        }



        public void AddHookies(IEnumerable<EntityToken> hooks)
        {
            Verify.ArgumentNotNull(hooks, "hooks");

            IEnumerable<EntityToken> resolvedHooks = hooks.Evaluate();

            Verify.ArgumentCondition(!resolvedHooks.Contains(null), "hooks", "The collection contains one or more null values");

            _hooks.AddRange(resolvedHooks);
        }
	}
}

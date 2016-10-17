using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Xml.Linq;
using Composite.C1Console.Actions.Data;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.Core.IO;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;
using Composite.Core.Xml;
using Composite.Data;


namespace Composite.C1Console.Trees
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public sealed class GenericDuplicateDataActionNode : ActionNode
    {
        /// <exclude />
        protected override void OnAddAction(Action<ElementAction> actionAdder, EntityToken entityToken, TreeNodeDynamicContext dynamicContext, DynamicValuesHelperReplaceContext dynamicValuesHelperReplaceContext)
        {
            Icon = new ResourceHandle(BuildInIconProviderName.ProviderName, "copy");

            actionAdder(new ElementAction(new ActionHandle(new ProxyDataActionToken(ActionIdentifier.Duplicate,this.PermissionTypes)))
            {
                VisualData = CreateActionVisualizedData(dynamicValuesHelperReplaceContext)
            });
        }

        /// <exclude />
        public override string ToString()
        {
            return $"GenericDuplicateDataActionNode, Label = {this.Label}";
        }


    }
}

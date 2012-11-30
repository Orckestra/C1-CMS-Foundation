using System.Collections.Generic;
using System.Xml.Linq;


namespace Composite.C1Console.Trees
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class AttributeDynamicValuesHelper
    {
        private readonly Dictionary<string, DynamicValuesHelper> _dynamicValuesHelpers = new Dictionary<string, DynamicValuesHelper>();

        /// <exclude />
        public XElement Element { get; private set; }


        /// <exclude />
        public AttributeDynamicValuesHelper(XElement element)
        {
            this.Element = element;
        }



        /// <exclude />
        public XElement ReplaceValues(DynamicValuesHelperReplaceContext context)
        {
            XElement result = new XElement(this.Element);

            foreach (XAttribute attribute in GetAttributes(result))
            {
                DynamicValuesHelper dynamicValuesHelper = _dynamicValuesHelpers[GetKeyValue(attribute)];

                string newValue = dynamicValuesHelper.ReplaceValues(context);

                attribute.SetValue(newValue);
            }

            return result;
        }



        /// <exclude />
        public void Initialize(TreeNode ownerTreeNode)
        {
            foreach (XAttribute attribute in GetAttributes(this.Element))
            {
                string key = GetKeyValue(attribute);
                if (_dynamicValuesHelpers.ContainsKey(key) == true) continue;

                DynamicValuesHelper dynamicValuesHelper = new DynamicValuesHelper(attribute.Value);
                dynamicValuesHelper.Initialize(ownerTreeNode);

                _dynamicValuesHelpers.Add(key, dynamicValuesHelper);
            }
        }



        private static IEnumerable<XAttribute> GetAttributes(XElement element)
        {
            return element.DescendantsAndSelf().Attributes();
        }



        private static string GetKeyValue(XAttribute attribute)
        {
            return attribute.Name + "·" + attribute.Value;
        }
    }
}

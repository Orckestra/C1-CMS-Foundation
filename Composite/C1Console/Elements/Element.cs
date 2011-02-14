using System;
using System.Collections.Generic;
using System.Diagnostics;
using Composite.Core.Logging;


namespace Composite.C1Console.Elements
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Flags]
    public enum ElementExternalActionAdding
    {
        /// <exclude />
        AllowGlobal = 1,

        /// <exclude />
        AllowProcessConotroller = 2,

        /// <exclude />
        AllowManageUserPermissions = 4 
    }



    internal static class ElementExternalActionAddingExtensions
    {
        public static ElementExternalActionAdding Remove(this ElementExternalActionAdding currentValue, ElementExternalActionAdding valueToRemove)
        {
            if ((currentValue & valueToRemove) == valueToRemove)
            {
                currentValue = currentValue ^ valueToRemove;
            }

            return currentValue;
        }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [DebuggerDisplay("{VisualData.Label}")]
    public sealed class Element
    {
        private ElementHandle _elementHandle;
        private List<ElementAction> _elementActions = new List<ElementAction>();
        private Dictionary<string, string> _propertyBag = new Dictionary<string, string>();


        private Element()
        {
            this.MovabilityInfo = new ElementDragAndDropInfo();
            this.ElementExternalActionAdding = ElementExternalActionAdding.AllowGlobal | ElementExternalActionAdding.AllowProcessConotroller | ElementExternalActionAdding.AllowManageUserPermissions;
            this.TreeLockBehavior = TreeLockBehavior.Normal;
        }


        /// <exclude />
        public Element(ElementHandle elementHandle)
            : this()
        {
            if (elementHandle == null) throw new ArgumentNullException("elementHandle");

            _elementHandle = elementHandle;            
        }



        /// <exclude />
        public Element(ElementHandle elementHandle, ElementVisualizedData visualData)
            : this()
        {
            if (elementHandle == null) throw new ArgumentNullException("elementHandle");
            if (visualData == null) throw new ArgumentNullException("visualData");
            
            _elementHandle = elementHandle;

            this.VisualData = visualData;            
        }



        /// <exclude />
        public Element(ElementHandle elementHandle, ElementDragAndDropInfo movabilityInfo)
            : this()
        {
            if (elementHandle == null) throw new ArgumentNullException("elementHandle");
            if (movabilityInfo == null) throw new ArgumentNullException("movabilityInfo");

            _elementHandle = elementHandle;
            this.MovabilityInfo = movabilityInfo;
        }



        /// <exclude />
        public Element(ElementHandle elementHandle, ElementVisualizedData visualData, ElementDragAndDropInfo movabilityInfo)
            : this()
        {
            if (elementHandle == null) throw new ArgumentNullException("elementHandle");
            if (visualData == null) throw new ArgumentNullException("visualData");
            if (movabilityInfo == null) throw new ArgumentNullException("movabilityInfo");
            
            _elementHandle = elementHandle;

            this.VisualData = visualData;
            this.MovabilityInfo = movabilityInfo;            
        }



        /// <exclude />
        public ElementHandle ElementHandle
        {
            get { return _elementHandle; }
        }



        /// <exclude />
        public ElementVisualizedData VisualData { get; set; }



        /// <exclude />
        public ElementDragAndDropInfo MovabilityInfo { get; private set; }


        /// <exclude />
        public bool IsLocaleAware { get; set; }


        /// <exclude />
        public Dictionary<string, string> PropertyBag
        {
            get { return _propertyBag; }
        }


        /// <exclude />
        public string TagValue { get; set; }


        /// <exclude />
        public TreeLockBehavior TreeLockBehavior { get; set; }


        #region Action methods
        /// <exclude />
        public ElementExternalActionAdding ElementExternalActionAdding
        {
            get;
            set;
        }


        /// <exclude />
        public int ActionCount
        {
            get
            {
                return _elementActions.Count;
            }

        }


        /// <exclude />
        public void AddAction(ElementAction elementAction)
        {
            if (elementAction == null) throw new ArgumentNullException("elementAction");

            if (_elementActions.Contains(elementAction) == false)
            {
                _elementActions.Add(elementAction);
            }
            else
            {
                LoggingService.LogWarning("Element", string.Format("An action with the same action token type '{0}' and same serialized string '{1}' has already been added", elementAction.ActionHandle.ActionToken.GetType(), elementAction.ActionHandle.ActionToken.Serialize()));
            }
        }



        /// <exclude />
        public void AddAction(IEnumerable<ElementAction> elementActions)
        {
            if (elementActions == null) throw new ArgumentNullException("elementActions");

            foreach (ElementAction elementAction in elementActions)
            {
                AddAction(elementAction);
            }
        }



        /// <exclude />
        public void RemoveAction(ElementAction elementAction)
        {
            if (elementAction == null) throw new ArgumentNullException("elementAction");

            _elementActions.Remove(elementAction);
        }



        internal void RemoveMovabilityInfo()
        {
            MovabilityInfo = new ElementDragAndDropInfo();
        }



        /// <exclude />
        public IEnumerable<ElementAction> Actions
        {
            get { return _elementActions; }
        }
        #endregion


        /// <exclude />
        public override bool Equals(object obj)
        {
            return Equals(obj as Element);
        }


        /// <exclude />
        public bool Equals(Element element)
        {
            if (element == null) return false;

            return element.ElementHandle.EntityToken.Equals(this.ElementHandle.EntityToken);
        }


        /// <exclude />
        public override int GetHashCode()
        {
            return this.ElementHandle.EntityToken.GetHashCode();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Diagnostics;
using Composite.Logging;


namespace Composite.Elements
{
    [Flags]
    public enum ElementExternalActionAdding
    {        
        AllowGlobal = 1,
        AllowProcessConotroller = 2,
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

        public Element(ElementHandle elementHandle)
            : this()
        {
            if (elementHandle == null) throw new ArgumentNullException("elementHandle");

            _elementHandle = elementHandle;            
        }


        public Element(ElementHandle elementHandle, ElementVisualizedData visualData)
            : this()
        {
            if (elementHandle == null) throw new ArgumentNullException("elementHandle");
            if (visualData == null) throw new ArgumentNullException("visualData");
            
            _elementHandle = elementHandle;

            this.VisualData = visualData;            
        }



        public Element(ElementHandle elementHandle, ElementDragAndDropInfo movabilityInfo)
            : this()
        {
            if (elementHandle == null) throw new ArgumentNullException("elementHandle");
            if (movabilityInfo == null) throw new ArgumentNullException("movabilityInfo");

            _elementHandle = elementHandle;            
        }



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


        


        public ElementHandle ElementHandle
        {
            get { return _elementHandle; }
        }



        public ElementVisualizedData VisualData { get; set; }



        public ElementDragAndDropInfo MovabilityInfo { get; private set; }


        public bool IsLocaleAware { get; set; }


        public Dictionary<string, string> PropertyBag
        {
            get { return _propertyBag; }
        }

        public string TagValue { get; set; }


        public TreeLockBehavior TreeLockBehavior { get; set; }

        #region Action methods
        public ElementExternalActionAdding ElementExternalActionAdding
        {
            get;
            set;
        }


        public int ActionCount
        {
            get
            {
                return _elementActions.Count;
            }

        }


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



        public void AddAction(IEnumerable<ElementAction> elementActions)
        {
            if (elementActions == null) throw new ArgumentNullException("elementActions");

            foreach (ElementAction elementAction in elementActions)
            {
                AddAction(elementAction);
            }
        }

        public void RemoveAction(ElementAction elementAction)
        {
            if (elementAction == null) throw new ArgumentNullException("elementAction");

            _elementActions.Remove(elementAction);
        }


        internal void RemoveMovabilityInfo()
        {
            MovabilityInfo = new ElementDragAndDropInfo();
        }

        public IEnumerable<ElementAction> Actions
        {
            get { return _elementActions; }
        }
        #endregion


        public override bool Equals(object obj)
        {
            return Equals(obj as Element);
        }


        public bool Equals(Element element)
        {
            if (element == null) return false;

            return element.ElementHandle.EntityToken.Equals(this.ElementHandle.EntityToken);
        }


        public override int GetHashCode()
        {
            return this.ElementHandle.EntityToken.GetHashCode();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Diagnostics;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
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
        AllowProcessController = 2,

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
    /// Define a tree element to be displayed in the C1 Console tree structure
    /// </summary>
    [DebuggerDisplay("{VisualData.Label}")]
    public sealed class Element
    {
        private ElementHandle _elementHandle;
        private List<ElementAction> _elementActions = new List<ElementAction>();
        private Dictionary<string, string> _propertyBag = new Dictionary<string, string>();


        private Element()
        {
            this.MovabilityInfo = new ElementDragAndDropInfo();
            this.ElementExternalActionAdding = ElementExternalActionAdding.AllowGlobal | ElementExternalActionAdding.AllowProcessController | ElementExternalActionAdding.AllowManageUserPermissions;
            this.TreeLockBehavior = TreeLockBehavior.Normal;
        }


        /// <summary>
        /// Constructs a new <see cref="Element"/> from the given <see cref=" ElementHandle"/>.
        /// </summary>
        /// <param name="elementHandle"></param>
        public Element(ElementHandle elementHandle)
            : this()
        {
            if (elementHandle == null) throw new ArgumentNullException("elementHandle");

            _elementHandle = elementHandle;            
        }



        /// <summary>
        /// Constructs a new <see cref="Element"/> from the given <see cref=" ElementHandle"/> and <see cref="ElementVisualizedData"/>.
        /// </summary>
        /// <param name="elementHandle"></param>
        /// <param name="visualData"></param>
        public Element(ElementHandle elementHandle, ElementVisualizedData visualData)
            : this()
        {
            if (elementHandle == null) throw new ArgumentNullException("elementHandle");
            if (visualData == null) throw new ArgumentNullException("visualData");
            
            _elementHandle = elementHandle;

            this.VisualData = visualData;            
        }



        /// <summary>
        /// Constructs a new <see cref="Element"/> from the given <see cref=" ElementHandle"/> and <see cref="ElementDragAndDropInfo"/>.
        /// </summary>
        /// <param name="elementHandle"></param>
        /// <param name="movabilityInfo"></param>
        public Element(ElementHandle elementHandle, ElementDragAndDropInfo movabilityInfo)
            : this()
        {
            if (elementHandle == null) throw new ArgumentNullException("elementHandle");
            if (movabilityInfo == null) throw new ArgumentNullException("movabilityInfo");

            _elementHandle = elementHandle;
            this.MovabilityInfo = movabilityInfo;
        }



        /// <summary>
        /// Constructs a new <see cref="Element"/> from the given <see cref=" ElementHandle"/>, <see cref="ElementVisualizedData"/> and <see cref="ElementDragAndDropInfo"/>.
        /// </summary>
        /// <param name="elementHandle"></param>
        /// <param name="visualData"></param>
        /// <param name="movabilityInfo"></param>
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



        /// <summary>
        /// The <see cref="ElementHandle"/> for this Element.
        /// </summary>
        public ElementHandle ElementHandle
        {
            get { return _elementHandle; }
        }



        /// <summary>
        /// The <see cref="ElementVisualizedData"/> for this Element.
        /// </summary>
        public ElementVisualizedData VisualData { get; set; }



        /// <summary>
        /// The <see cref="ElementDragAndDropInfo"/> for this Element.
        /// </summary>
        public ElementDragAndDropInfo MovabilityInfo { get; private set; }


        /// <exclude />
        public bool IsLocaleAware { get; set; }


        /// <summary>
        /// Custom properties to attach to this Element
        /// </summary>
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

        internal void AddWorkflowAction(string workflowType, IEnumerable<PermissionType> permissionType, ActionVisualizedData visualizedData)
        {
            Type type = WorkflowFacade.GetWorkflowType(workflowType);

            this.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(type, permissionType)))
                               {
                                   VisualData = visualizedData
                               });
        }


        /// <summary>
        /// Add an action to the element
        /// </summary>
        /// <param name="elementAction">The action to add</param>
        public void AddAction(ElementAction elementAction)
        {
            Verify.ArgumentNotNull(elementAction, "elementAction");

            if (_elementActions.Contains(elementAction) == false)
            {
                _elementActions.Add(elementAction);
            }
            else
            {
                LoggingService.LogWarning("Element", string.Format("An action with the same action token type '{0}' and same serialized string '{1}' has already been added", elementAction.ActionHandle.ActionToken.GetType(), elementAction.ActionHandle.ActionToken.Serialize()));
            }
        }



        /// <summary>
        /// Add one or more actions to the element
        /// </summary>
        /// <param name="elementActions">The actions to add</param>
        public void AddAction(IEnumerable<ElementAction> elementActions)
        {
            Verify.ArgumentNotNull(elementActions, "elementActions");

            foreach (ElementAction elementAction in elementActions)
            {
                AddAction(elementAction);
            }
        }



        /// <summary>
        /// Remove an action from the element
        /// </summary>
        /// <param name="elementAction">The action to remove</param>
        public void RemoveAction(ElementAction elementAction)
        {
            if (elementAction == null) throw new ArgumentNullException("elementAction");

            _elementActions.Remove(elementAction);
        }



        internal void RemoveMovabilityInfo()
        {
            MovabilityInfo = new ElementDragAndDropInfo();
        }



        /// <summary>
        /// Actions declared on this element
        /// </summary>
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

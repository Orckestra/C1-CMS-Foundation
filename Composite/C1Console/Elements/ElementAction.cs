using System;


namespace Composite.C1Console.Elements
{
    /// <summary>    
    /// Define an action you can attach to an <see cref="Element"/>.
    /// </summary>
    public sealed class ElementAction
    {
        private readonly ActionHandle _actionHandle;


        /// <summary>
        /// Constructs a new instance.
        /// </summary>
        /// <param name="actionHandle"></param>
        public ElementAction(ActionHandle actionHandle)
        {
            if (actionHandle == null) throw new ArgumentNullException("actionHandle");

            _actionHandle = actionHandle;            
        }



        /// <summary>
        /// The action handle
        /// </summary>
        public ActionHandle ActionHandle
        {
            get { return _actionHandle; }
        }



        /// <summary>
        /// The visual representation (label, icon) of the action
        /// </summary>
        public ActionVisualizedData VisualData { get; set; }



        /// <exclude />
        public string TagValue { get; set; }

        

        /// <exclude />
        public override bool Equals(object obj)
        {
            return base.Equals(obj);
        }



        /// <exclude />
        public bool Equals(ElementAction elementAction)
        {
            if (elementAction == null) return false;

            return this.ActionHandle.Equals(elementAction);
        }



        /// <exclude />
        public override int GetHashCode()
        {
            return this.ActionHandle.GetHashCode();
        }
    }
}

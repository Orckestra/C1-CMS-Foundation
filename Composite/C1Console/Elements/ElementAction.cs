using System;


namespace Composite.C1Console.Elements
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ElementAction
    {
        private readonly ActionHandle _actionHandle;


        /// <exclude />
        public ElementAction(ActionHandle actionHandle)
        {
            if (actionHandle == null) throw new ArgumentNullException("actionHandle");

            _actionHandle = actionHandle;            
        }



        /// <exclude />
        public ActionHandle ActionHandle
        {
            get { return _actionHandle; }
        }



        /// <exclude />
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

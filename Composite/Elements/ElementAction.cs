using System;


namespace Composite.Elements
{
    public sealed class ElementAction
    {
        private ActionHandle _actionHandle;        


        public ElementAction(ActionHandle actionHandle)
        {
            if (actionHandle == null) throw new ArgumentNullException("actionHandle");

            _actionHandle = actionHandle;
        }



        public ActionHandle ActionHandle
        {
            get { return _actionHandle; }
        }



        public ActionVisualizedData VisualData { get; set; }


        public string TagValue { get; set; }


        public override bool Equals(object obj)
        {
            return base.Equals(obj);
        }



        public bool Equals(ElementAction elementAction)
        {
            if (elementAction == null) return false;

            return this.ActionHandle.Equals(elementAction);
        }



        public override int GetHashCode()
        {
            return this.ActionHandle.GetHashCode();
        }
    }
}

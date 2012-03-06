using System;


namespace Composite.C1Console.Forms.Flows
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class StandardEventIdentifiers
    {
        /// <exclude />
        public static IFormEventIdentifier Save { get { return new SaveEvent(); } }

        /// <exclude />
        public static IFormEventIdentifier SaveAndPublish { get { return new SaveAndPublishEvent(); } }        

        /// <exclude />
        public static IFormEventIdentifier SaveAs { get { return new SaveAsEvent(); } }

        /// <exclude />
        public static IFormEventIdentifier Next { get { return new NextEvent(); } }

        /// <exclude />
        public static IFormEventIdentifier Previous { get { return new PreviousEvent(); } }

        /// <exclude />
        public static IFormEventIdentifier Finish { get { return new FinishEvent(); } }

        /// <exclude />
        public static IFormEventIdentifier Cancel { get { return new CancelEvent(); } }

        /// <exclude />
        public static IFormEventIdentifier Preview { get { return new PreviewEvent(); } }

        /// <exclude />
        public static IFormEventIdentifier CustomEvent01 { get { return new CustomEvent(1); } }

        /// <exclude />
        public static IFormEventIdentifier CustomEvent02 { get { return new CustomEvent(2); } }

        /// <exclude />
        public static IFormEventIdentifier CustomEvent03 { get { return new CustomEvent(3); } }

        /// <exclude />
        public static IFormEventIdentifier CustomEvent04 { get { return new CustomEvent(4); } }

        /// <exclude />
        public static IFormEventIdentifier CustomEvent05 { get { return new CustomEvent(5); } }

    }


    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class SaveEvent : IFormEventIdentifier
    {
        /// <exclude />
        public SaveEvent() { }

        /// <exclude />
        public string BindingName { get { return "SaveEventHandler"; } }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public class SaveAndPublishEvent : IFormEventIdentifier
    {
        /// <exclude />
        public SaveAndPublishEvent() { }

        /// <exclude />
        public string BindingName { get { return "SaveAndPublishEventEventHandler"; } }
    }


    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class SaveAsEvent : IFormEventIdentifier
    {
        /// <exclude />
        public SaveAsEvent() { }

        /// <exclude />
        public string BindingName { get { return "SaveAsEventHandler"; } }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class PreviewEvent : IFormEventIdentifier
    {
        /// <exclude />
        public PreviewEvent() { }

        /// <exclude />
        public string BindingName { get { return "PreviewEventHandler"; } }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class NextEvent : IFormEventIdentifier
    {
        /// <exclude />
        public NextEvent() { }

        /// <exclude />
        public string BindingName { get { return "NextEventHandler"; } }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class PreviousEvent : IFormEventIdentifier
    {
        /// <exclude />
        public PreviousEvent() { }

        /// <exclude />
        public string BindingName { get { return "PreviousEventHandler"; } }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class FinishEvent : IFormEventIdentifier
    {
        /// <exclude />
        public FinishEvent() { }

        /// <exclude />
        public string BindingName { get { return "FinishEventHandler"; } }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class CancelEvent : IFormEventIdentifier
    {
        /// <exclude />
        public CancelEvent() { }

        /// <exclude />
        public string BindingName { get { return "CancelEventHandler"; } }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class CustomEvent : IFormEventIdentifier
    {
        /// <exclude />
        public CustomEvent(int eventNumber) 
        {
            if (eventNumber < 1 || eventNumber > 5) throw new ArgumentException("Value must be between 1 and 5", "eventNumber");
            this.BindingName = string.Format("CustomEvent0{0}Handler", eventNumber);
        }

        /// <exclude />
        public string BindingName
        {
            get;
            private set;
        }
    }
}
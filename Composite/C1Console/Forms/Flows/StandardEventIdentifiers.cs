using System;


namespace Composite.C1Console.Forms.Flows
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class StandardEventIdentifiers
    {
        public static IFormEventIdentifier Save { get { return new SaveEvent(); } }
        public static IFormEventIdentifier SaveAs { get { return new SaveAsEvent(); } }
        public static IFormEventIdentifier Next { get { return new NextEvent(); } }
        public static IFormEventIdentifier Previous { get { return new PreviousEvent(); } }
        public static IFormEventIdentifier Finish { get { return new FinishEvent(); } }
        public static IFormEventIdentifier Cancel { get { return new CancelEvent(); } }

        public static IFormEventIdentifier Preview { get { return new PreviewEvent(); } }

        public static IFormEventIdentifier CustomEvent01 { get { return new CustomEvent(1); } }
        public static IFormEventIdentifier CustomEvent02 { get { return new CustomEvent(2); } }
        public static IFormEventIdentifier CustomEvent03 { get { return new CustomEvent(3); } }
        public static IFormEventIdentifier CustomEvent04 { get { return new CustomEvent(4); } }
        public static IFormEventIdentifier CustomEvent05 { get { return new CustomEvent(5); } }

    }


    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class SaveEvent : IFormEventIdentifier
    {
        public SaveEvent() { }

        public string BindingName { get { return "SaveEventHandler"; } }

    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class SaveAsEvent : IFormEventIdentifier
    {
        public SaveAsEvent() { }

        public string BindingName { get { return "SaveAsEventHandler"; } }

    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class PreviewEvent : IFormEventIdentifier
    {
        public PreviewEvent() { }

        public string BindingName { get { return "PreviewEventHandler"; } }

    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class NextEvent : IFormEventIdentifier
    {
        public NextEvent() { }

        public string BindingName { get { return "NextEventHandler"; } }

    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class PreviousEvent : IFormEventIdentifier
    {
        public PreviousEvent() { }

        public string BindingName { get { return "PreviousEventHandler"; } }

    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class FinishEvent : IFormEventIdentifier
    {
        public FinishEvent() { }

        public string BindingName { get { return "FinishEventHandler"; } }

    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class CancelEvent : IFormEventIdentifier
    {
        public CancelEvent() { }

        public string BindingName { get { return "CancelEventHandler"; } }

    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class CustomEvent : IFormEventIdentifier
    {
        public CustomEvent(int eventNumber) 
        {
            if (eventNumber < 1 || eventNumber > 5) throw new ArgumentException("Value must be between 1 and 5", "eventNumber");
            this.BindingName = string.Format("CustomEvent0{0}Handler", eventNumber);
        }

        public string BindingName
        {
            get;
            private set;
        }

    }
}
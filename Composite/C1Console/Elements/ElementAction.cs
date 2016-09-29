using Composite.C1Console.Security;


namespace Composite.C1Console.Elements
{
    /// <summary>
    /// Define an action you can attach to an <see cref="Element"/>.
    /// </summary>
    public sealed class ElementAction
    {
        /// <summary>
        /// Constructs a new instance.
        /// </summary>
        /// <param name="actionHandle"></param>
        public ElementAction(ActionHandle actionHandle)
        {
            Verify.ArgumentNotNull(actionHandle, nameof(actionHandle));

            ActionHandle = actionHandle;
        }


        /// <summary>
        /// Constructs a new instance.
        /// </summary>
        /// <param name="actionToken"></param>
        public ElementAction(ActionToken actionToken): this(new ActionHandle(actionToken))
        {
        }


        /// <summary>
        /// The action handle
        /// </summary>
        public ActionHandle ActionHandle { get; }


        /// <summary>
        /// The visual representation (label, icon) of the action
        /// </summary>
        public ActionVisualizedData VisualData { get; set; }


        /// <exclude />
        public string TagValue { get; set; }


        /// <exclude />
        public override int GetHashCode() => this.ActionHandle.GetHashCode();
    }
}

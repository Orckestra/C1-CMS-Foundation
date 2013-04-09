using System;
using System.Collections.Generic;


namespace Composite.C1Console.Elements
{
    /// <summary>    
    /// Details describing how this element may be dragged or accept dragged elements
    /// </summary>
    public sealed class ElementDragAndDropInfo
    {
        private List<string> _dropHashTypeIdentifiers = null;

        /// <summary>
        /// Constructs a new instance.
        /// </summary>
        internal ElementDragAndDropInfo()
        {
            this.DragType = null;
            this.SupportsIndexedPosition = false;
        }


        /// <summary>
        /// Constructs a new instance.
        /// </summary>
        /// <param name="movabilityType">Declare what this element is in terms of drag and drop by declaring a <see cref="System.Type"/>. 
        /// Element providers accepting drag and drop of this type will accept this.</param>
        public ElementDragAndDropInfo(Type movabilityType)
        {
            this.DragType = movabilityType;
        }

        /// <summary>
        /// Identifies a type of element in relation to movability. Used in conjunction with the AdoptTypeAcceptList.
        /// Use the MovabilitySubType to distinguish sub types.
        /// </summary>
        public Type DragType { get; set; }


        /// <summary>
        /// Optional. If the element provider presents data from multiple sources that can not exchange data and you 
        /// can not communicate a unique source using a Type alone, use this field to distinguish the source.
        /// </summary>
        public string DragSubType { get; set; }


        /// <exclude />
        public bool SupportsIndexedPosition { get; set; }


        /// <exclude />
        public void AddDropType(Type acceptMovabilityType)
        {
            this.AddDropType(acceptMovabilityType, "");
        }


        /// <exclude />
        public void AddDropType(Type acceptMovabilityType, string acceptMovabilitySubType)
        {
            if (_dropHashTypeIdentifiers == null) _dropHashTypeIdentifiers = new List<string>();

            _dropHashTypeIdentifiers.Add(BuildHashedTypeIdentifier(acceptMovabilityType, acceptMovabilitySubType));
        }



        internal string GetHashedTypeIdentifier()
        {
            return BuildHashedTypeIdentifier(this.DragType, this.DragSubType);
        }


        internal List<string> GetDropHashTypeIdentifiers()
        {
            return _dropHashTypeIdentifiers;
        }



        private static string BuildHashedTypeIdentifier(Type type, string subType)
        {
            return string.Format("{0}:{1}:{2}", type.Name, subType, type.AssemblyQualifiedName.GetHashCode());
        }
    }
}

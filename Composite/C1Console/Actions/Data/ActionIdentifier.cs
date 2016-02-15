using System;
using System.Collections.Generic;
using System.Text;
using Composite.C1Console.Security;
using Composite.Core.Serialization;

namespace Composite.C1Console.Actions.Data
{
    /// <summary>
    /// A container for Action Types
    /// </summary>
    public class ActionIdentifier
    {
        private readonly string _value;

        private ActionIdentifier(string identifier)
        {
            _value = identifier;
        }

        /// <exclude />
        public static ActionIdentifier Edit => new ActionIdentifier("Edit");

        /// <exclude />
        public static ActionIdentifier Add => new ActionIdentifier("Add");

        /// <exclude />
        public static ActionIdentifier Delete => new ActionIdentifier("Delete");

        /// <exclude />
        public static ActionIdentifier SendToDraft => new ActionIdentifier("SendToDraft");

        /// <exclude />
        public static ActionIdentifier SendForApproval => new ActionIdentifier("SendForApproval");

        /// <exclude />
        public static ActionIdentifier SendForPublication => new ActionIdentifier("SendForPublication");

        /// <exclude />
        public static ActionIdentifier Publish => new ActionIdentifier("Publish");

        /// <exclude />
        public static ActionIdentifier Unpublish => new ActionIdentifier("Unpublish");

        /// <exclude />
        public static ActionIdentifier Undo => new ActionIdentifier("Undo");

        /// <exclude />
        public IEnumerable<PermissionType> Permissions()
        {
            if (this == Add)
            {
                yield return PermissionType.Add;
            }
            if (this == Edit)
            {
                yield return PermissionType.Edit;
            }
            if (this == Delete)
            {
                yield return PermissionType.Delete;
            }
            if (this == Publish)
            {
                yield return PermissionType.Publish;
            }
            if (this == Unpublish)
            {
                yield return PermissionType.Publish;
            }
            if (this == SendForApproval)
            {
                yield return PermissionType.Edit;
            }
            if (this == SendForPublication)
            {
                yield return PermissionType.Approve;
            }
            if (this == SendToDraft)
            {
                yield return PermissionType.Edit;
                yield return PermissionType.Approve;
                yield return PermissionType.Publish;
            }
            if (this == Undo)
            {
                yield return PermissionType.Edit;
            }
        }

        /// <exclude />
        public override int GetHashCode()
        {
            return _value.GetHashCode();
        }

        /// <exclude />
        public override bool Equals(object obj)
        {
            return Equals(obj as ActionIdentifier);
        }

        /// <exclude />
        public bool Equals(ActionIdentifier obj)
        {
            return obj == this;
        }

        /// <exclude />
        public static bool operator ==(ActionIdentifier a1, ActionIdentifier a2)
        {
            return  a1?._value == a2?._value;
        }

        /// <exclude />
        public static bool operator !=(ActionIdentifier a1, ActionIdentifier a2)
        {
            return !(a1 == a2);
        }

        /// <exclude />
        public string Serialize()
        {
            StringBuilder stringBuilder = new StringBuilder();

            StringConversionServices.SerializeKeyValuePair(stringBuilder, "_ActionIdentifier_", _value);

            return stringBuilder.ToString();
        }

        /// <exclude />
        public static ActionIdentifier Deserialize(string serializedData)
        {
            Dictionary<string, string> dic = StringConversionServices.ParseKeyValueCollection(serializedData);

            if (!dic.ContainsKey("_ActionIdentifier_"))
            {
                throw new ArgumentException("The serialiedWorkflowActionToken is not a serialized _ActionIdentifier_", nameof(serializedData));
            }

            string serializedType = StringConversionServices.DeserializeValueString(dic["_ActionIdentifier_"]);

            return new ActionIdentifier(serializedType);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel;
using Composite.Core;
using Composite.Data;


namespace Composite.Data.DynamicTypes
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)]
    internal static class DataTypeValidator
    {
        /// <summary>
        /// This method validates if the existing .NET runtime type match the recorded meta data (DataTypeDescriptor).
        /// In case there is a mismatch, changes might have been done to the runtime type and an update on 
        /// the existing store(s)could not be performed.
        /// </summary>
        /// <param name="interfaceType"></param>
        /// <param name="existingDataTypeDescriptor"></param>
        /// <returns></returns>
        public static bool Validate(Type interfaceType, DataTypeDescriptor existingDataTypeDescriptor, out string errorMessage)
        {
            DataTypeDescriptor newDataTypeDescriptor;
            
            try
            {
                newDataTypeDescriptor  = DynamicTypeManager.BuildNewDataTypeDescriptor(interfaceType);
            }
            catch (Exception ex)
            {
                errorMessage = ex.Message;
                return false;
            }

            try
            {
                new DataTypeChangeDescriptor(existingDataTypeDescriptor, newDataTypeDescriptor);
            }
            catch (Exception ex)
            {
                errorMessage = ex.Message;
                return false;
            }

            errorMessage = null;
            return true;
        }
    }
}

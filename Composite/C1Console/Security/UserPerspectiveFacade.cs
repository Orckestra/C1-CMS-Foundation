using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Data;
using Composite.Data.Types;


namespace Composite.C1Console.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class UserPerspectiveFacade
	{
        /// <exclude />
        public static IEnumerable<string> GetSerializedEntityTokens(string username)
        {
            return
                from activePerspective in DataFacade.GetData<IUserActivePerspective>()
                where activePerspective.Username == username
                select activePerspective.SerializedEntityToken;
        }



        /// <exclude />
        public static IEnumerable<EntityToken> GetEntityTokens(string username )
        {
            return
                GetSerializedEntityTokens(username).Select(f => EntityTokenSerializer.Deserialize(f));
        }



        /// <exclude />
        public static void SetEntityTokens(string username, IEnumerable<EntityToken> entityTokens)
        {
            SetSerializedEntityTokens(username, entityTokens.Select(f => EntityTokenSerializer.Serialize(f)));
        }



        /// <exclude />
        public static void SetSerializedEntityTokens(string username, IEnumerable<string> serializedEntityTokens)
        {
            DataFacade.Delete<IUserActivePerspective>(f => f.Username == username);

            foreach (string serializedEntityToken in serializedEntityTokens)
            {
                IUserActivePerspective activePerspective = DataFacade.BuildNew<IUserActivePerspective>();

                activePerspective.Username = username;
                activePerspective.SerializedEntityToken = serializedEntityToken;
                activePerspective.Id = Guid.NewGuid();

                DataFacade.AddNew<IUserActivePerspective>(activePerspective);
            }
        }



        /// <exclude />
        public static void DeleteAll(string username)
        {
            DataFacade.Delete<IUserActivePerspective>(f => f.Username == username);
        }
    }
}

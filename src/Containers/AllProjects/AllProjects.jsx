import { Tabs } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader.jsx";
import ProposalCard from "../../Components/ProposalCard/ProposalCard.jsx";
import * as ProjectActions from "../../State/Project/ProjectActions.js";
import styles from "./AllProjects.module.css";
import noCompleteProject from "../../Assets/noCompleteProject.jpg";
import noOngoingProject from "../../Assets/noOngoingProject.webp";
import noRejectedProject from "../../Assets/noRejectedProject.webp";
export default function AllProjects() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth?.user);
  const token = useSelector((state) => state.auth?.user?.token);
  const allProjectsDetails = useSelector(
    (state) => state.project?.allProjectsDetails
  );
  const allProjectsDetailsLoading = useSelector(
    (state) => state.project?.allProjectsDetailsLoading
  );

  useEffect(() => {
    dispatch(ProjectActions.getAllProjectsDetails({ token }));
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <Tabs defaultActiveKey="1">
          {/* for students */}

          <Tabs.TabPane tab="Ongoing" key="1">
            {allProjectsDetails?.ongoing?.length > 0 ? (
              <div className={styles.projectsContainer}>
                {allProjectsDetails.ongoing.map((item) => {
                  return (
                    <ProposalCard
                      projectDetails={item.project}
                      teamDetails={item.team}
                      showActions={false}
                    />
                  );
                })}
              </div>
            ) : (
              <div>
                {allProjectsDetailsLoading ? (
                  <Loader size="large" />
                ) : (
                  <>
                    <p className="text-center lg:text-2xl md:text-xl sm:text-lg">
                      There are no ongoing projects
                    </p>
                    <div className="w-full p-4 m-4">
                      <img
                        className="lg:w-3/5 md:w-4/5 sm:w-full mx-auto"
                        src={noOngoingProject}
                        alt=""
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Complete" key="2">
            {allProjectsDetails?.complete?.length > 0 ? (
              <div className={styles.projectsContainer}>
                {allProjectsDetails.complete.map((item) => {
                  return (
                    <ProposalCard
                      projectDetails={item.project}
                      teamDetails={item.team}
                      showActions={false}
                    />
                  );
                })}
              </div>
            ) : (
              <div>
                {allProjectsDetailsLoading ? (
                  <Loader size="large" />
                ) : (
                  <>
                    <p className="text-center lg:text-2xl md:text-xl sm:text-lg">
                      There are no complete projects
                    </p>
                    <div className="w-full p-4 m-4">
                      <img
                        className="lg:w-3/5 md:w-4/5 sm:w-full mx-auto"
                        src={noCompleteProject}
                        alt=""
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Rejected" key="3">
            {allProjectsDetails?.rejected?.length > 0 ? (
              <div className={styles.projectsContainer}>
                {allProjectsDetails.rejected.map((item) => {
                  return (
                    <ProposalCard
                      projectDetails={item.project}
                      teamDetails={item.team}
                      showActions={false}
                    />
                  );
                })}
              </div>
            ) : (
              <div>
                {allProjectsDetailsLoading ? (
                  <Loader size="large" />
                ) : (
                  <>
                    <p className="text-center lg:text-2xl md:text-xl sm:text-lg">
                      There are no rejected projects
                    </p>
                    <div className="w-full p-4 m-4">
                      <img
                        className="lg:w-3/5 md:w-4/5 sm:w-full mx-auto"
                        src={noRejectedProject}
                        alt=""
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}

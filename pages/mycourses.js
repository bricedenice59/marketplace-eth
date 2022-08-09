import { BaseLayout } from "@components/ui/layout";
import { useMoralis } from "react-moralis";
import { useEffect, useState, useContext } from "react";
import { CourseListComponent } from "@components/ui/course/index";
import Web3Context from "store/contract-context";

export default function Course() {
    const web3Context = useContext(Web3Context.Web3Context);
    const { account } = useMoralis();
    const [listOfCoursesForAuthor, setlistOfCoursesForAuthor] = useState([]);

    const fetchAuthorCourses = async () => {
        var allCoursesPublished;
        if (web3Context.contract) {
            try {
                allCoursesPublished = await web3Context.contract.getCourseAuthorPublishedCourses(
                    account
                );
            } catch (error) {}
        }

        if (!allCoursesPublished) return [];
        return allCoursesPublished;
    };

    async function DoFetchAuthorPublishedCourses() {
        const authorCourses = await fetchAuthorCourses();
        setlistOfCoursesForAuthor(authorCourses);
    }

    useEffect(() => {
        if (web3Context && web3Context.isWeb3Enabled) {
            DoFetchAuthorPublishedCourses();
        }
    }, [account]);

    useEffect(() => {
        if (web3Context && web3Context.isWeb3Enabled) {
            DoFetchAuthorPublishedCourses();
        }
    }, [web3Context]);

    return (
        <div>
            {web3Context && web3Context.isWeb3Enabled ? (
                web3Context.isChainSupported ? (
                    <div className="py-10">
                        <section className="grid grid-cols-2 gap-6 mb-5">
                            {listOfCoursesForAuthor.map((id, i) => (
                                <div
                                    key={id}
                                    className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-3xl"
                                >
                                    <CourseListComponent courseId={id}></CourseListComponent>
                                </div>
                            ))}
                        </section>
                    </div>
                ) : (
                    <div></div>
                )
            ) : (
                <div>Please connect an account...</div>
            )}
        </div>
    );
}

Course.Layout = BaseLayout;

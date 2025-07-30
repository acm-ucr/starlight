// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/utils/firebase";

interface teamSelectTypes {
  uid: number;
  currentTeam: string;
  status: string;
  track: string;
}

const TeamSelect = ({ uid, status, currentTeam, track }: teamSelectTypes) => {
  const [newTeam, setNewTeam] = useState(currentTeam);
  const [sparkProjects, setSparkProjects] = useState([]);

  const getSparkProjects = async () => {
    try {
      const docRef = doc(db, "projects", "spark");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const sparkData = docSnap.data();
        console.log("Spark:", sparkData.projects);
        setSparkProjects(sparkData.projects);
      } else {
        console.log("No spark projects!");
      }
    } catch (error) {
      console.error("Error fetching spark projects:", error);
    }
  };

  useEffect(() => {
    getSparkProjects();
  }, []);

  const handleSaveChanges = async (teamName: string) => {
    try {
      const res = await fetch(`/api/dashboard/${track}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          objects: [{ uid, team: teamName }],
          status: status,
        }),
      });
      if (res.ok) {
        setNewTeam(teamName);
        console.log(res);
      }
    } catch (err) {
      console.error("Failed to update team", err);
    }
  };

  return (
    <div className="hover:cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="bg-starlight-table-selected cursor-pointer rounded-lg border-2 border-black px-2 text-center">
            {newTeam}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {sparkProjects.map((project, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => handleSaveChanges(project)}
            >
              {project}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TeamSelect;

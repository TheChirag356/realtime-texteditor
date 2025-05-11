"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Play, Send, CircleStop, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";
import random from "random-name";
import { Session } from "@/components/EditorNavbar";

export default function CollaborateButton() {

  const session: Session = {
    id: "test-room",
    isSessionLive: false,
  };

  const [username, setUsername] = React.useState(random.first());
  const [isSessionLive, setIsSessionLive] = React.useState(
    session.isSessionLive
  );
  const [copy, setCopy] = React.useState(true);
  const shareLink = `/editor/${session.id}`;

  const handleChangeUsername = (e: any) => {
    try {
      setUsername(e.target.value);
    } catch (error) {
      console.error("Error changing username:", error);
    }
  };

  const handleCopy = () => {
    try {
      setCopy(false);
      navigator.clipboard.writeText(shareLink);
    } catch (error) {
      console.error("Error changing copying the url:", error);
    } finally {
      setTimeout(() => {
        setCopy(true);
      }, 1000);
    }
  };

  return (
    <TooltipProvider>
      <Dialog>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant={isSessionLive ? `tertiary` : `default`}>
                <Send />
                <span className="hidden md:inline"> Share</span>
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Live Collaboration</p>
          </TooltipContent>
        </Tooltip>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Live Collaboration</DialogTitle>
            {!isSessionLive && (
              <DialogDescription>
                Invite people to collaborate on your drawing.
              </DialogDescription>
            )}
          </DialogHeader>
          {!isSessionLive ? (
            <div className="flex items-center space-x-2">
              <Button
                type="submit"
                className="px-3"
                onClick={() => setIsSessionLive((prev) => !prev)}
              >
                <Play />
                Start Session
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Label>Your Name</Label>
                <Input
                  type="username"
                  value={username}
                  onChange={handleChangeUsername}
                />
              </div>
              <div>
                <Label>Link</Label>
                <div className="flex gap-2">
                  <Input type="url" value={shareLink} readOnly />
                  <Button size="icon" onClick={handleCopy}>
                    {copy ? <Copy /> : <Check />}
                  </Button>
                </div>
              </div>
              <Button
                variant="destructive"
                type="submit"
                onClick={() => setIsSessionLive((prev) => !prev)}
              >
                <CircleStop />
                Stop Session
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}

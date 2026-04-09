import { useState } from "react";
import { Upload, Camera, MapPin, Calendar, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const species = [
  "Green Sea Turtle",
  "Hawksbill Turtle",
  "Loggerhead Turtle",
  "Leatherback Turtle",
  "Olive Ridley Turtle",
  "Kemp's Ridley Turtle",
  "Flatback Turtle",
  "Unknown / Not Sure",
];

const behaviors = [
  "Swimming / Cruising",
  "Feeding",
  "Resting on bottom",
  "Basking at surface",
  "Nesting on beach",
  "Hatchlings emerging",
  "Mating",
  "Entangled / Injured",
  "Other",
];

const SubmitSighting = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleFiles = (newFiles: FileList | null) => {
    if (newFiles) {
      setFiles((prev) => [...prev, ...Array.from(newFiles)].slice(0, 5));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Sighting submitted! Thank you for contributing to sea turtle conservation.", {
      duration: 5000,
    });
  };

  return (
    <div className="container max-w-2xl py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Sightings
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Report a Sighting</h1>
        <p className="text-muted-foreground mt-2">
          Share your sea turtle encounter to help researchers track populations and migration patterns.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Photo Upload */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Photos</Label>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
              dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFiles(e.dataTransfer.files); }}
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Drop your photos here</p>
                <p className="text-sm text-muted-foreground">or click to browse · up to 5 photos</p>
              </div>
            </div>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {files.map((file, i) => (
                <div key={i} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Upload ${i + 1}`}
                    className="w-20 h-20 object-cover rounded-lg border border-border"
                  />
                  <button
                    type="button"
                    onClick={() => setFiles(files.filter((_, j) => j !== i))}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Species */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Species</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select species (or best guess)" />
            </SelectTrigger>
            <SelectContent>
              {species.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-semibold mb-2 block">
              <MapPin className="h-3.5 w-3.5 inline mr-1" />
              Location
            </Label>
            <Input placeholder="e.g. Coral Bay, Australia" />
          </div>
          <div>
            <Label className="text-sm font-semibold mb-2 block">
              <Calendar className="h-3.5 w-3.5 inline mr-1" />
              Date of Sighting
            </Label>
            <Input type="date" />
          </div>
        </div>

        {/* Behavior */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Observed Behavior</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="What was the turtle doing?" />
            </SelectTrigger>
            <SelectContent>
              {behaviors.map((b) => (
                <SelectItem key={b} value={b}>{b}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Size */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Estimated Size (carapace length)</Label>
          <Input placeholder="e.g. 70cm" />
        </div>

        {/* Description */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Description</Label>
          <Textarea
            placeholder="Describe your encounter — water conditions, turtle health, any distinguishing marks, number of turtles, etc."
            rows={5}
          />
        </div>

        {/* Your Name */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Your Name</Label>
          <Input placeholder="How should we credit you?" />
        </div>

        <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          <Upload className="h-4 w-4 mr-2" />
          Submit Sighting
        </Button>
      </form>
    </div>
  );
};

export default SubmitSighting;

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Autocomplete, 
  TextField, 
  Card, 
  CardContent, 
  Typography, 
  Avatar, 
  CircularProgress,
  Box,
  Button
} from '@mui/material';
import './doctorProfile.css';

export default function DoctorProfile() {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const loadDoctors = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:5000/doctores");
        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }
        const data = await response.json();
        const formattedDoctors = data.map(doctor => ({
          value: doctor.id_doctor,
          label: doctor.nombre_doctor,
          specialty: doctor.especialidad,
          phone: doctor.numero_telefono,
          image: "/placeholder.svg?height=50&width=50", // Puedes actualizar esto para usar la imagen real del doctor si está disponible
        }));
        setDoctors(formattedDoctors);
      } catch (err) {
        setError("Failed to load doctors. Please try again.");
        setDoctors([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadDoctors();
  }, []);

  const handleChange = (event, newValue) => {
    setSelectedDoctor(newValue);
  };

  const handleClearSelection = () => {
    setSelectedDoctor(null);
  };

  const options = useMemo(() => doctors, [doctors]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      {!selectedDoctor && (
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option.label}
          value={selectedDoctor}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField {...params} label="Seleccionar un doctor" variant="outlined" className="text-field" size='small'/>
          )}
          renderOption={(props, option) => (
            <Card {...props} component="li" className="autocomplete-card" >
              <CardContent className="autocomplete-card-content">
                <Avatar src={option.image} alt={`Foto de ${option.label}`} className="autocomplete-avatar" />
                <div>
                  <Typography variant="subtitle1" className="typography-subtitle1">{option.label}</Typography>
                  <Typography variant="body2" className="typography-body2">
                    {option.specialty}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          )}
          noOptionsText="No se encontraron doctores"
          loading={isLoading}
          loadingText="Cargando doctores..."
        />
      )}
      {selectedDoctor && (
        <Card className="selected-doctor-card">
          <CardContent className="selected-doctor-card-content">
            <Avatar src={selectedDoctor.image} alt={`Foto de ${selectedDoctor.label}`} className="selected-doctor-avatar" />
            <div>
              <Typography variant="h6" className="typography-h6">{selectedDoctor.label}</Typography>
              <Typography variant="body1" className="typography-body1">{selectedDoctor.specialty}</Typography>
              <Typography variant="body2" className="typography-body2">{selectedDoctor.phone}</Typography>
            </div>
            <Button onClick={handleClearSelection} variant="contained" color="secondary" className="change-doctor-button">
              Cambiar Doctor
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
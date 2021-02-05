package fi.paavolagroup.travel.service;


import java.util.stream.Stream;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Path;

import org.springframework.core.io.Resource;

public interface FilesStorageService {
    
    public void init();

    public void save(MultipartFile file);

    public Resource load(String filename);

    public void deleteAll();

    public void deleteFile(String filename);

    public Stream<Path> loadAll();

    public MultipartFile renameFile(String fileName, MultipartFile file);
}
